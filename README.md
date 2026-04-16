# KrishiMitra Node.js + Express Deployment (Hostinger Ready)

This repository now contains a complete Node.js/Express setup to run the KrishiMitra React JSX app directly on Hostinger Node.js hosting.

## Project Structure

```
KrishiMitraapp/
├── public/
│   └── index.html                # React 18 + Babel runtime + full embedded KrishiMitra app
├── src/
│   └── KrishiMitra_Final_v2.jsx  # Source JSX copy of the app
├── server.js                     # Express server + static hosting + Claude API proxy
├── package.json                  # Node.js dependencies and scripts
├── .env.example                  # Environment variable template
├── .gitignore                    # Security/build ignore rules
└── README.md
```

## Features Included

The embedded app includes all core KrishiMitra features from `KrishiMitra_Final_v2.jsx`:
- Login & onboarding
- Home screen + crop management
- Crop library with AI guidance
- Disease / pest / weed diagnosis
- Shop, cart and checkout flow
- Mandi prices
- Government schemes, credit, machine booking, profile and orders

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` values (especially `CLAUDE_API_KEY`).
4. Start server:
   ```bash
   npm start
   ```
5. Open:
   - App: `http://localhost:3000`
   - Health API: `http://localhost:3000/api/health`

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: `3000`) |
| `NODE_ENV` | No | Runtime environment |
| `CLAUDE_API_KEY` | Yes | Anthropic API key used by `/api/claude` |
| `CLAUDE_MODEL` | No | Claude model (default: `claude-sonnet-4-20250514`) |
| `ALLOWED_ORIGIN` | No | CORS origin (`*` by default) |

## API Documentation

### `GET /api/health`
Returns service health.

**Response**
```json
{
  "ok": true,
  "service": "KrishiMitra",
  "time": "2026-01-01T00:00:00.000Z"
}
```

### `POST /api/claude`
Proxy endpoint used by frontend AI features.

**Request Body**
```json
{
  "prompt": "string",
  "img64": "optional base64 image",
  "sys": "optional system prompt override"
}
```

**Success Response**
```json
{
  "text": "AI response text"
}
```

## Hostinger Node.js Deployment Steps

1. In Hostinger hPanel, open **Advanced → Node.js**.
2. Create application with:
   - **Application root**: project folder path
   - **Startup file**: `server.js`
   - **Node.js version**: 18+
3. Upload project files (`public`, `src`, `server.js`, `package.json`, etc.).
4. Install dependencies from terminal:
   ```bash
   npm install --production
   ```
5. Add environment variables in Hostinger panel (same as `.env.example`).
6. Restart the Node.js app.
7. Open your domain and verify app + `/api/health`.

## Notes

- Frontend AI calls now go through `/api/claude` (server-side key handling).
- Keep `.env` private and never commit real API keys.
