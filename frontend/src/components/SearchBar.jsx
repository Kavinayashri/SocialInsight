function SearchBar({ keyword, setKeyword, onSearch, loading }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search a brand, product, person, technology or topic" aria-label="Search conversations" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </div>
      <button disabled={loading} className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60">
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
export default SearchBar;
