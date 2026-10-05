function PlatformFilter({ activePlatform, setActivePlatform }) {
  const platforms = ["All", "Reddit", "YouTube", "GitHub", "X"];
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <button key={platform} onClick={() => setActivePlatform(platform)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${activePlatform === platform ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800"}`}>
          {platform}
        </button>
      ))}
    </div>
  );
}
export default PlatformFilter;
