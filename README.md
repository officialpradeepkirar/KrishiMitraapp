# KrishiMitra Node.js + Express Deployment (Hostinger Ready)

This repository now contains a complete Node.js/Express setup to run the KrishiMitra React JSX app directly on Hostinger Node.js hosting.

## Project Structure

```
KrishiMitraapp/
├── public/
│   └── index.html                # React 18 + Babel runtime + full embedded KrishiMitra app
├── src/
│   └── KrishiMitra_Final_v2.jsx  # Source JSX copy of the app
├── logs/                         # PM2 runtime log files (git-ignored)
├── server.js                     # Express server + static hosting + Claude API proxy
├── ecosystem.config.js           # PM2 process config for Hostinger
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
| `ALLOWED_ORIGIN` | No | Allowed CORS origins (comma-separated, default: `http://localhost:3000`) |

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

## PM2 Process Management (Recommended for Hostinger)

[PM2](https://pm2.keymetrics.io/) keeps your app alive after crashes and system reboots.

### Install PM2 globally (once on the server)
```bash
npm install -g pm2
```

### Start the app with PM2
```bash
npm run pm2:start
# or directly:
pm2 start ecosystem.config.js
```

### Useful PM2 commands
| Command | Description |
|---|---|
| `pm2 list` | Show all running apps |
| `npm run pm2:logs` / `pm2 logs krishimitra` | Live log stream |
| `npm run pm2:restart` / `pm2 restart krishimitra` | Reload without downtime |
| `npm run pm2:stop` / `pm2 stop krishimitra` | Stop the process |
| `pm2 monit` | Real-time CPU/memory dashboard |

### Auto-start on server reboot
```bash
pm2 startup   # generates a system startup command — run the printed command
pm2 save      # saves the process list so PM2 restores it on reboot
```

### Optional: log rotation
```bash
pm2 install pm2-logrotate           # install the logrotate module
pm2 set pm2-logrotate:max_size 10M  # rotate when a log file exceeds 10 MB
pm2 set pm2-logrotate:retain 7      # keep 7 rotated files
```

### ecosystem.config.js highlights
- **1 instance** in `fork` mode — correct for shared Hostinger plans.
- **300 MB memory limit** — process restarts automatically if exceeded.
- **Structured JSON logs** written to `logs/out.log` and `logs/error.log` (git-ignored).
- Set `instances: "max"` and `exec_mode: "cluster"` only if your plan provides multiple CPU cores.
