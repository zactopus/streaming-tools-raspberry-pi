const { networkInterfaces } = require("os");

function getIpAddress() {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  if (!results.wlan0 || results.wlan0.length == 0) {
    return null;
  }

  const [ip] = results.wlan0;

  return ip;
}

module.exports = getIpAddress;
