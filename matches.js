// ═══════════════════════════════════════════════════════
//  فاهم — السيرفر الوسيط (يحل مشكلة CORS)
//  يجلب البيانات من football-data.org بشكل آمن
// ═══════════════════════════════════════════════════════

const API_KEY = process.env.FOOTBALL_API_KEY; // تضعه في Vercel Environment Variables
const BASE    = "https://api.football-data.org/v4";

// الدوريات المدعومة
const LEAGUE_IDS = {
  PL:  2021, // البريميرليغ
  LL:  2014, // لاليغا
  CL:  2001, // دوري الأبطال
  BL:  2002, // البوندسليغا
  SA:  2019, // سيريا A
  L1:  2015, // ليغ 1
};

async function fetchFromAPI(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "X-Auth-Token": API_KEY,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// ── تحويل بيانات المباراة لصيغة التطبيق ──
function formatMatch(match) {
  const status = match.status;
  const isLive  = status === "IN_PLAY" || status === "PAUSED";
  const isDone  = status === "FINISHED";

  return {
    id:         match.id,
    home:       match.homeTeam.shortName || match.homeTeam.name,
    away:       match.awayTeam.shortName || match.awayTeam.name,
    homeCrest:  match.homeTeam.crest || "⚽",
    awayCrest:  match.awayTeam.crest || "⚽",
    homeScore:  isDone || isLive ? match.score.fullTime.home : null,
    awayScore:  isDone || isLive ? match.score.fullTime.away : null,
    status:     isLive ? "IN_PLAY" : isDone ? "FINISHED" : "SCHEDULED",
    date:       formatDate(match.utcDate),
    time:       formatTime(match.utcDate),
    league:     match.competition.code,
    leagueName: match.competition.name,
    minute:     match.minute || null,
    hasAnalysis: isDone,
  };
}

function formatDate(utcDate) {
  const d    = new Date(utcDate);
  const now  = new Date();
  const diff = Math.floor((d - now) / 86400000);
  if (diff === -1 || (diff === 0 && d < now)) return "أمس";
  if (diff === 0)  return "اليوم";
  if (diff === 1)  return "غداً";
  return d.toLocaleDateString("ar-SA", { day: "numeric", month: "short" });
}

function formatTime(utcDate) {
  const d = new Date(utcDate);
  return d.toLocaleTimeString("ar-SA", {
    hour:   "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Riyadh",
  });
}

// ══════════════════════════════════════════════════════
//  ROUTES
// ══════════════════════════════════════════════════════
module.exports = async (req, res) => {
  // CORS headers — يسمح للتطبيق بالوصول
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { type, league, date } = req.query;

  // تحقق من وجود API Key
  if (!API_KEY) {
    return res.status(500).json({
      error: "FOOTBALL_API_KEY غير موجود — أضفه في Vercel Environment Variables",
    });
  }

  try {
    // ── ١. مباريات اليوم (الرئيسية) ──
    if (type === "today") {
      const today = new Date().toISOString().split("T")[0];
      const data  = await fetchFromAPI(`/matches?date=${today}`);
      const matches = (data.matches || []).map(formatMatch);
      return res.json({ matches, updated: new Date().toISOString() });
    }

    // ── ٢. مباريات مباشرة الآن ──
    if (type === "live") {
      const data    = await fetchFromAPI("/matches?status=LIVE");
      const matches = (data.matches || []).map(formatMatch);
      return res.json({ matches, updated: new Date().toISOString() });
    }

    // ── ٣. مباريات دوري معين ──
    if (type === "league" && league && LEAGUE_IDS[league]) {
      const id   = LEAGUE_IDS[league];
      const data = await fetchFromAPI(`/competitions/${id}/matches?status=SCHEDULED,IN_PLAY,FINISHED&limit=20`);
      const matches = (data.matches || []).map(formatMatch);
      return res.json({ matches, updated: new Date().toISOString() });
    }

    // ── ٤. ترتيب الدوري ──
    if (type === "standings" && league && LEAGUE_IDS[league]) {
      const id   = LEAGUE_IDS[league];
      const data = await fetchFromAPI(`/competitions/${id}/standings`);
      const table = data.standings?.[0]?.table || [];
      const standings = table.map((t, i) => ({
        pos:    t.position,
        team:   t.team.shortName || t.team.name,
        crest:  t.team.crest,
        teamId: t.team.id,
        p:      t.playedGames,
        w:      t.won,
        d:      t.draw,
        l:      t.lost,
        gf:     t.goalsFor,
        ga:     t.goalsAgainst,
        gd:     t.goalDifference,
        pts:    t.points,
      }));
      return res.json({ standings, updated: new Date().toISOString() });
    }

    // ── ٥. الهدافون ──
    if (type === "scorers" && league && LEAGUE_IDS[league]) {
      const id   = LEAGUE_IDS[league];
      const data = await fetchFromAPI(`/competitions/${id}/scorers?limit=15`);
      const scorers = (data.scorers || []).map(s => ({
        name:    s.player.name,
        team:    s.team.shortName || s.team.name,
        crest:   s.team.crest,
        goals:   s.goals,
        assists: s.assists || 0,
        matches: s.playedMatches,
        nationality: s.player.nationality,
      }));
      return res.json({ scorers, updated: new Date().toISOString() });
    }

    // ── ٦. تفاصيل مباراة (أحداث) ──
    if (type === "match" && req.query.id) {
      const data = await fetchFromAPI(`/matches/${req.query.id}`);
      return res.json({
        match: formatMatch(data),
        score: data.score,
        updated: new Date().toISOString(),
      });
    }

    // ── مسار غير معروف ──
    return res.status(400).json({ error: "type غير صحيح. الخيارات: today, live, league, standings, scorers, match" });

  } catch (err) {
    console.error("API Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
