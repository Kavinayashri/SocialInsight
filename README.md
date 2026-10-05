# SocialInsight

SocialInsight is a student-built social listening dashboard for searching public conversations and comparing discussion across connected sources.

## Live sources
- Reddit public search
- GitHub public repository search
- YouTube Data API (optional key)
- X recent search API (optional bearer token)

The app does not fabricate search results. If an optional source is not configured or unavailable, the dashboard reports that source as unavailable and continues with the sources that respond.

## Stack
React + Vite + Tailwind CSS · Node.js + Express · Axios

## Run
### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## API keys
Only optional integrations need keys. Keep keys in `backend/.env`; never commit that file.
