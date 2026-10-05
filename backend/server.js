import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const positiveWords = ["love","great","good","best","amazing","excellent","helpful","useful","awesome","recommend","success","happy","positive","fast","easy"];
const negativeWords = ["bad","worst","hate","awful","terrible","broken","bug","issue","problem","scam","fail","failed","expensive","disappointed","negative","slow","hard"];
function sentiment(text = "") { const value=text.toLowerCase(); const p=positiveWords.filter(w=>value.includes(w)).length; const n=negativeWords.filter(w=>value.includes(w)).length; return p>n?"Positive":n>p?"Negative":"Neutral"; }
function topic(keyword,text="") { const t=text.toLowerCase(); if(/price|cost|expensive|cheap|pricing/.test(t))return `${keyword} · Pricing`; if(/bug|error|issue|problem|crash|broken/.test(t))return `${keyword} · Issues`; if(/review|opinion|think|experience/.test(t))return `${keyword} · Opinions`; if(/news|update|launch|release/.test(t))return `${keyword} · News`; if(/tutorial|learn|course|guide/.test(t))return `${keyword} · Learning`; return `${keyword} · Discussion`; }

async function searchReddit(keyword) {
  const url=`https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&sort=relevance&t=month&limit=25`;
  const {data}=await axios.get(url,{timeout:10000,headers:{"User-Agent":"SocialInsight/1.0 portfolio research app"}});
  return (data?.data?.children||[]).map(({data:item})=>{const text=`${item.title||""} ${item.selftext||""}`;return {id:`reddit-${item.id}`,platform:"Reddit",keyword,author:item.author?`u/${item.author}`:"Reddit user",username:item.author?`u/${item.author}`:"",content:item.selftext||item.title||"",publishedAt:item.created_utc?new Date(item.created_utc*1000).toISOString():"",sourceUrl:item.permalink?`https://www.reddit.com${item.permalink}`:"https://www.reddit.com/",contextTitle:item.title||"Reddit discussion",sentiment:sentiment(text),topic:topic(keyword,text),engagement:(item.score||0)+(item.num_comments||0),subreddit:item.subreddit_name_prefixed||""};});
}
async function searchYouTube(keyword) {
  if(!process.env.YOUTUBE_API_KEY)return [];
  const {data}=await axios.get("https://www.googleapis.com/youtube/v3/search",{params:{part:"snippet",q:keyword,type:"video",maxResults:15,order:"relevance",key:process.env.YOUTUBE_API_KEY},timeout:10000});
  return (data.items||[]).map(item=>{const s=item.snippet||{};const text=`${s.title||""} ${s.description||""}`;return {id:`youtube-${item.id?.videoId}`,platform:"YouTube",keyword,author:s.channelTitle||"YouTube channel",username:s.channelId||"",content:s.description||s.title||"",publishedAt:s.publishedAt||"",sourceUrl:item.id?.videoId?`https://www.youtube.com/watch?v=${item.id.videoId}`:"https://www.youtube.com/",contextTitle:s.title||"YouTube result",sentiment:sentiment(text),topic:topic(keyword,text),thumbnail:s.thumbnails?.medium?.url||s.thumbnails?.default?.url||""};});
}
async function searchGitHub(keyword) {
  const {data}=await axios.get("https://api.github.com/search/repositories",{params:{q:keyword,sort:"stars",order:"desc",per_page:15},headers:{Accept:"application/vnd.github+json","User-Agent":"SocialInsight"},timeout:10000});
  return (data.items||[]).map(item=>{const text=`${item.name||""} ${item.description||""}`;return {id:`github-${item.id}`,platform:"GitHub",keyword,author:item.owner?.login||"GitHub user",username:item.owner?.login||"",content:item.description||"No repository description.",publishedAt:item.created_at||"",sourceUrl:item.html_url,contextTitle:item.full_name||item.name,sentiment:sentiment(text),topic:topic(keyword,text),engagement:(item.stargazers_count||0)+(item.forks_count||0)};});
}
async function searchX(keyword) {
  if(!process.env.X_BEARER_TOKEN)return [];
  const {data}=await axios.get("https://api.x.com/2/tweets/search/recent",{params:{query:`${keyword} -is:retweet`,max_results:10,"tweet.fields":"created_at,public_metrics,author_id"},headers:{Authorization:`Bearer ${process.env.X_BEARER_TOKEN}`},timeout:10000});
  return (data.data||[]).map(item=>({id:`x-${item.id}`,platform:"X",keyword,author:item.author_id?`User ${item.author_id}`:"X user",content:item.text,publishedAt:item.created_at||"",sourceUrl:`https://x.com/i/web/status/${item.id}`,contextTitle:"X post",sentiment:sentiment(item.text),topic:topic(keyword,item.text),engagement:(item.public_metrics?.like_count||0)+(item.public_metrics?.reply_count||0)+(item.public_metrics?.retweet_count||0)}));
}

app.get("/",(_req,res)=>res.json({message:"SocialInsight live-search backend is running",sources:["Reddit","YouTube","GitHub","X (optional token)"]}));
app.get("/api/mentions",async(req,res)=>{
  const keyword=String(req.query.q||"").trim(); if(!keyword)return res.status(400).json({error:"Please provide a search keyword using ?q="});
  const tasks={Reddit:searchReddit(keyword),YouTube:searchYouTube(keyword),GitHub:searchGitHub(keyword),X:searchX(keyword)};
  const entries=await Promise.all(Object.entries(tasks).map(async([name,promise])=>{try{return [name,{ok:true,data:await promise}]}catch(error){return [name,{ok:false,error:error?.response?.data?.message||error?.response?.statusText||error?.message||"request failed"}]} }));
  const results=[]; const errors=[]; for(const [name,value] of entries){if(value.ok)results.push(...value.data);else errors.push(`${name}: ${value.error}`);}
  results.sort((a,b)=>new Date(b.publishedAt||0)-new Date(a.publishedAt||0));
  res.json({keyword,sourceCount:new Set(results.map(r=>r.platform)).size,results,errors,live:true});
});
app.listen(PORT,()=>console.log(`SocialInsight backend running on http://localhost:${PORT}`));
