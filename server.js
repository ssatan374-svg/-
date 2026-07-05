// ═══════════════════════════════════════════════════════
//  فاهم — سيرفر Express للـ Railway
//  ارفع هذا الملف بدل matches.js
// ═══════════════════════════════════════════════════════

const express = require("express");
const cors    = require("cors");
const app     = express();
const PORT    = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE    = "https://api.football-data.org/v4";

const LEAGUE_IDS = {
  PL: 2021, LL: 2014, CL: 2001,
  BL: 2002, SA: 2019, L1: 2015,
};

async function fetchAPI(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-Auth-Token": API_KEY },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

function formatDate(utcDate) {
  const d   = new Date(utcDate);
  const now = new Date();
  const diff = Math.floor((d - now) / 86400000);
  if (diff < 0 && diff > -1) return "اليوم";
  if (diff === -1) return "أمس";
  if (diff === 0)  return "اليوم";
  if (diff === 1)  return "غداً";
  return d.toLocaleDateString("ar-SA", { day: "numeric", month: "short", timeZone: "Asia/Riyadh" });
}

function formatTime(utcDate) {
  return new Date(utcDate).toLocaleTimeString("ar-SA", {
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Riyadh",
  });
}

function formatMatch(m) {
  const live = m.status === "IN_PLAY" || m.status === "PAUSED";
  const done = m.status === "FINISHED";
  return {
    id:         m.id,
    home:       m.homeTeam.shortName || m.homeTeam.name,
    away:       m.awayTeam.shortName || m.awayTeam.name,
    homeCrest:  m.homeTeam.crest || "",
    awayCrest:  m.awayTeam.crest || "",
    homeScore:  done || live ? m.score.fullTime.home : null,
    awayScore:  done || live ? m.score.fullTime.away : null,
    status:     live ? "IN_PLAY" : done ? "FINISHED" : "SCHEDULED",
    date:       formatDate(m.utcDate),
    time:       formatTime(m.utcDate),
    minute:     m.minute || null,
    league:     m.competition.code,
    leagueName: m.competition.name,
    hasAnalysis: done,
  };
}

// ── مباريات اليوم ──
app.get("/api/matches", async (req, res) => {
  const { type, league, id } = req.query;
  if (!API_KEY) return res.status(500).json({ error: "FOOTBALL_API_KEY غير موجود" });

  try {
    if (type === "today" || !type) {
      const today = new Date().toISOString().split("T")[0];
      const data  = await fetchAPI(`/matches?date=${today}`);
      return res.json({ matches: (data.matches||[]).map(formatMatch), updated: new Date() });
    }

    if (type === "live") {
      const data = await fetchAPI("/matches?status=LIVE");
      return res.json({ matches: (data.matches||[]).map(formatMatch), updated: new Date() });
    }

    if (type === "league" && LEAGUE_IDS[league]) {
      const data = await fetchAPI(`/competitions/${LEAGUE_IDS[league]}/matches?status=SCHEDULED,IN_PLAY,FINISHED&limit=20`);
      return res.json({ matches: (data.matches||[]).map(formatMatch), updated: new Date() });
    }

    if (type === "standings" && LEAGUE_IDS[league]) {
      const data = await fetchAPI(`/competitions/${LEAGUE_IDS[league]}/standings`);
      const table = data.standings?.[0]?.table || [];
      return res.json({
        standings: table.map(t => ({
          pos: t.position, team: t.team.shortName||t.team.name,
          crest: t.team.crest, teamId: t.team.id,
          p: t.playedGames, w: t.won, d: t.draw, l: t.lost,
          gf: t.goalsFor, ga: t.goalsAgainst, gd: t.goalDifference, pts: t.points,
        })),
        updated: new Date(),
      });
    }

    if (type === "scorers" && LEAGUE_IDS[league]) {
      const data = await fetchAPI(`/competitions/${LEAGUE_IDS[league]}/scorers?limit=15`);
      return res.json({
        scorers: (data.scorers||[]).map(s => ({
          name: s.player.name, team: s.team.shortName||s.team.name,
          crest: s.team.crest, goals: s.goals,
          assists: s.assists||0, matches: s.playedMatches,
          nationality: s.player.nationality,
        })),
        updated: new Date(),
      });
    }

    if (type === "match" && id) {
      const data = await fetchAPI(`/matches/${id}`);
      return res.json({ match: formatMatch(data), updated: new Date() });
    }

    res.status(400).json({ error: "type غير صحيح" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── health check ──
app.get("/", (req, res) => {
  res.json({ status: "فاهم API شغال ✅", time: new Date() });
});

app.listen(PORT, () => console.log(`✅ فاهم API شغال على port ${PORT}`));
    
