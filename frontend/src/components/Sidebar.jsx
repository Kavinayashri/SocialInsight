function Sidebar({ activePage, setActivePage }) {
  const navigation = [
    { id: "overview", label: "Overview" },
    { id: "conversations", label: "Conversations" },
    { id: "insights", label: "Insights" },
    { id: "monitoring", label: "Monitoring" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">SI</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">SocialInsight</h1>
            <p className="text-[11px] text-slate-500">Social listening dashboard</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
        <div className="space-y-1">
          {navigation.map((item) => (
            <button key={item.id} onClick={() => setActivePage(item.id)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activePage === item.id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <div className="border-t border-slate-200 px-6 py-4">
        <p className="text-xs font-medium text-slate-500">Live sources</p>
        <p className="mt-1 text-[11px] leading-5 text-slate-400">Reddit · YouTube · GitHub</p>
      </div>
    </aside>
  );
}
export default Sidebar;
