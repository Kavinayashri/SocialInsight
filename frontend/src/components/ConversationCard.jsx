function ConversationCard({ platform, author, content, publishedAt, sourceUrl, contextTitle, sentiment, topic, engagement, subreddit, thumbnail }) {
  const sentimentClass = sentiment === "Positive" ? "bg-emerald-50 text-emerald-700" : sentiment === "Negative" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600";
  return <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300">
    <div className="flex gap-4 p-5">
      {thumbnail && <img src={thumbnail} alt="" className="hidden h-20 w-32 rounded-lg object-cover sm:block" />}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold text-indigo-700">{platform}</span>{subreddit && <span className="text-xs text-slate-400">{subreddit}</span>}</div><p className="mt-1 text-sm font-semibold text-slate-800">{contextTitle || author}</p><p className="mt-0.5 text-xs text-slate-400">{author}</p></div>
          {sentiment && <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${sentimentClass}`}>{sentiment}</span>}
        </div>
        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">{content || "No text was returned by the source."}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
          {publishedAt && <span>{new Date(publishedAt).toLocaleString()}</span>}
          {engagement !== undefined && <span>Engagement {engagement}</span>}
          {topic && <span className="text-slate-500">{topic}</span>}
          {sourceUrl && <a href={sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800">Open source ↗</a>}
        </div>
      </div>
    </div>
  </article>;
}
export default ConversationCard;
