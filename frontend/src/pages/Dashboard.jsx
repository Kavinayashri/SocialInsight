import { useMemo, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PlatformFilter from "../components/PlatformFilter";
import StatsCard from "../components/StatsCard";
import ConversationCard from "../components/ConversationCard";
import { getMentions } from "../services/api";

function Dashboard({ searchState, setSearchState, setActivePage }) {
  const [keyword, setKeyword] = useState(searchState.keyword || "");
  const [loading, setLoading] = useState(false);
  const [activePlatform, setActivePlatform] = useState("All");
  const [sort, setSort] = useState("recent");

  const runSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const payload = await getMentions(keyword);
      setSearchState({ keyword: payload.keyword, mentions: payload.results || [], errors: payload.errors || [], live: payload.live });
      localStorage.setItem("socialInsight:lastSearch", JSON.stringify({ keyword: payload.keyword, mentions: payload.results || [] }));
    } catch (error) {
      setSearchState({ keyword, mentions: [], errors: [error.message], live: false });
    } finally { setLoading(false); }
  };

  const filtered = useMemo(() => {
    const rows = searchState.mentions.filter((m) => activePlatform === "All" || m.platform === activePlatform);
    return [...rows].sort((a, b) => sort === "engagement" ? (b.engagement || 0) - (a.engagement || 0) : new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  }, [searchState.mentions, activePlatform, sort]);
  const positive = filtered.length ? Math.round(filtered.filter((m) => m.sentiment === "Positive").length / filtered.length * 100) : 0;
  const platforms = new Set(filtered.map((m) => m.platform)).size;
  const topics = new Set(filtered.map((m) => m.topic).filter(Boolean)).size;

  return <main className="min-h-screen px-5 py-6 md:ml-60 md:px-8 lg:px-10">
    <Header keyword={searchState.keyword} live={searchState.live} />
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <SearchBar keyword={keyword} setKeyword={setKeyword} onSearch={runSearch} loading={loading} />
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <PlatformFilter activePlatform={activePlatform} setActivePlatform={setActivePlatform} />
        <div className="flex items-center gap-2 text-xs"><span className="text-slate-400">Sort</span><select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600"><option value="recent">Most recent</option><option value="engagement">Engagement</option></select></div>
      </div>
    </section>

    {searchState.errors.length > 0 && <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">Some sources were unavailable: {searchState.errors.join(" · ")}</div>}

    <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Conversations" value={filtered.length} description="Live public results" tone="indigo" />
      <StatsCard title="Sources" value={platforms} description="Platforms with results" tone="emerald" />
      <StatsCard title="Positive" value={`${positive}%`} description="Simple sentiment score" tone="amber" />
      <StatsCard title="Topics" value={topics} description="Detected discussion groups" tone="rose" />
    </section>

    <section className="mt-7">
      <div className="mb-3 flex items-end justify-between"><div><h3 className="text-lg font-bold text-slate-900">Conversations</h3><p className="mt-1 text-xs text-slate-400">Original public content returned by connected sources.</p></div>{searchState.keyword && <span className="text-xs text-slate-400">Search: <b className="text-slate-600">{searchState.keyword}</b></span>}</div>
      {!searchState.keyword && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-sm font-semibold text-slate-700">Start with a keyword</p><p className="mt-2 text-xs text-slate-400">Try a brand, product, technology, person or topic to fetch live public conversations.</p><div className="mt-5 flex flex-wrap justify-center gap-2">{["Tesla", "Artificial Intelligence", "React", "Netflix"].map((x) => <button key={x} onClick={() => setKeyword(x)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:border-indigo-200 hover:text-indigo-700">{x}</button>)}</div></div>}
      {searchState.keyword && loading && <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">Searching connected public sources…</div>}
      {searchState.keyword && !loading && filtered.length === 0 && <div className="rounded-xl border border-slate-200 bg-white p-12 text-center"><p className="text-sm font-semibold text-slate-700">No live results returned</p><p className="mt-2 text-xs text-slate-400">The keyword may have no matching public results, or a source may be unavailable.</p></div>}
      <div className="space-y-3">{!loading && filtered.map((m) => <ConversationCard key={m.id} {...m} />)}</div>
      {searchState.keyword && filtered.length > 0 && <button onClick={() => setActivePage("insights")} className="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100">View analysis for this search →</button>}
    </section>
  </main>;
}
export default Dashboard;
