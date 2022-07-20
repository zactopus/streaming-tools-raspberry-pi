module.exports = {
  apps: [
    {
      name: "pixel-art",
      script: "./src/pixel-art.js",
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["node_modules", "images"],
    },
    {
      name: "main",
      script: "./src/main.js",
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["node_modules", "images"],
    },
  ],
};
