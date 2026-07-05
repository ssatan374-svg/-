// ═══════════════════════════════════════════════════════
//  useFootballAPI — Hook لجلب البيانات الحقيقية
//  استخدمه في أي مكان في التطبيق
// ═══════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";

const API_BASE = "/api/matches"; // يتوجه للسيرفر الوسيط تلقائياً

// ── جلب البيانات الأساسي ──
async function apiFetch(params) {
  const query = new URLSearchParams(params).toString();
  const res   = await fetch(`${API_BASE}?${query}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// ══════════════════════════════════════════════════════
//  Hook: مباريات اليوم
// ══════════════════════════════════════════════════════
export function useTodayMatches() {
  const [matches, setMatches]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);
  const [updated, setUpdated]   = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetch({ type: "today" });
      setMatches(data.matches || []);
      setUpdated(data.updated);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    // تحديث كل 30 ثانية
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [fetch]);

  return { matches, loading, error, updated, refresh: fetch };
}

// ══════════════════════════════════════════════════════
//  Hook: مباريات مباشرة فقط
// ══════════════════════════════════════════════════════
export function useLiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async () => {
    try {
      const data = await apiFetch({ type: "live" });
      setMatches(data.matches || []);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    // تحديث كل 30 ثانية للمباريات المباشرة
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [fetch]);

  return { matches, loading, error, refresh: fetch };
}

// ══════════════════════════════════════════════════════
//  Hook: ترتيب دوري معين
// ══════════════════════════════════════════════════════
export function useStandings(league = "PL") {
  const [standings, setStandings] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiFetch({ type: "standings", league });
        setStandings(data.standings || []);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [league]);

  return { standings, loading, error };
}

// ══════════════════════════════════════════════════════
//  Hook: هدافو دوري معين
// ══════════════════════════════════════════════════════
export function useScorers(league = "PL") {
  const [scorers,  setScorers]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiFetch({ type: "scorers", league });
        setScorers(data.scorers || []);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [league]);

  return { scorers, loading, error };
}

// ══════════════════════════════════════════════════════
//  Hook: مباريات دوري معين
// ══════════════════════════════════════════════════════
export function useLeagueMatches(league = "PL") {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiFetch({ type: "league", league });
        setMatches(data.matches || []);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [league]);

  return { matches, loading, error };
}

// ══════════════════════════════════════════════════════
//  مثال على الاستخدام في App.jsx:
// ══════════════════════════════════════════════════════
/*
import { useTodayMatches, useLiveMatches, useStandings } from './useFootballAPI';

function App() {
  const { matches, loading, error, updated } = useTodayMatches();
  const { matches: liveMatches } = useLiveMatches();
  const { standings } = useStandings("PL");

  if (loading) return <div>جاري التحميل...</div>;
  if (error)   return <div>خطأ: {error}</div>;

  return (
    <div>
      <p>آخر تحديث: {updated}</p>
      {matches.map(m => (
        <div key={m.id}>
          {m.home} {m.homeScore} - {m.awayScore} {m.away}
        </div>
      ))}
    </div>
  );
}
*/
