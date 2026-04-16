// PM2 ecosystem config for Hostinger Node.js deployment
// Usage:
//   pm2 start ecosystem.config.js          # start / restart
//   pm2 stop krishimitra                   # stop
//   pm2 logs krishimitra                   # live logs
//   pm2 monit                              # dashboard
//   pm2 startup && pm2 save               # auto-start on reboot

module.exports = {
  apps: [
    {
      name: "krishimitra",
      script: "server.js",

      // Keep 1 instance on shared Hostinger hosting.
      // Set to "max" (or a number >1) only if your plan supports clusters.
      instances: 1,
      exec_mode: "fork",

      // Automatically restart if the process crashes
      autorestart: true,

      // Restart if memory grows above 300 MB
      max_memory_restart: "300M",

      // Wait 10 s before restarting to give shared hosting resources breathing room
      restart_delay: 10000,

      // Environment variables loaded from .env automatically by dotenv inside server.js.
      // You can also pin values here (overrides .env):
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      // Structured JSON logs — makes filtering with `pm2 logs` easier
      log_type: "json",

      // Log file locations (relative to project root)
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      merge_logs: true,

      // Log rotation requires the pm2-logrotate module:
      //   pm2 install pm2-logrotate
      //   pm2 set pm2-logrotate:max_size 10M
      // (the log_rotate_max_size key below has no effect without that module)

      // Watch mode OFF in production (avoids unnecessary restarts)
      watch: false,
    },
  ],
};
