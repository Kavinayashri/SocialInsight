function StatsCard({ title, value, description, tone = "indigo" }) {
  const tones = { indigo: "bg-indigo-50 text-indigo-700", emerald: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", rose: "bg-rose-50 text-rose-700" };
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3"><p className="text-sm font-medium text-slate-500">{title}</p><span className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase ${tones[tone]}`}>live</span></div>
    <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
    <p className="mt-1 text-xs text-slate-400">{description}</p>
  </div>;
}
export default StatsCard;
