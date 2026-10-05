function Header({ keyword, live }) {
  return <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Social intelligence</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Conversation overview</h2>
      <p className="mt-1 text-sm text-slate-500">Search public conversations and compare the discussion across supported sources.</p>
    </div>
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
      <span className={`h-2 w-2 rounded-full ${live ? "bg-emerald-500" : "bg-slate-300"}`} />
      <span className="font-medium text-slate-600">{live ? `Live search${keyword ? ` · ${keyword}` : ""}` : "Ready to search"}</span>
    </div>
  </header>;
}
export default Header;
