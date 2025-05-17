module.exports = {
    apps: [
      {
        name: "kiosk-app",
        script: "server.js",
        cwd: "/home/macmind",
        env: {
          PORT: 3000
        }
      }
    ]
  };
  