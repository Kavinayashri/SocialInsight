import ConversationCard from "../components/ConversationCard";
function Conversations({ searchState, setActivePage }) {
  return <main className="min-h-screen px-5 py-6 md:ml-60 md:px-8 lg:px-10"><div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Conversation feed</p><h2 className="mt-1 text-2xl font-bold">All results</h2><p className="mt-1 text-sm text-slate-500">Review the public posts returned by the current search.</p></div>{!searchState.keyword ? <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-sm font-semibold">No search has been run yet.</p><button onClick={() => setActivePage("overview")} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">Go to search</button></div> : <div className="space-y-3">{searchState.mentions.map((m) => <ConversationCard key={m.id} {...m} />)}</div>}</main>;
}
export default Conversations;
