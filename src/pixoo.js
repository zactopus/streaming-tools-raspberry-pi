const Divoom = require("pixoo");

const { PIXOO_IP_ADDRESS } = process.env;
const PIXOO_GRID_SIZE = 64;

class Pixoo {
  constructor() {
    this.pixoo = new Divoom.Pixoo(PIXOO_IP_ADDRESS, PIXOO_GRID_SIZE);
  }

  async init() {
    console.log("Initialising Pixoo...");
    await this.pixoo.init();
    console.log("Pixoo ready!");
  }

  async drawBuffer(...args) {
    return this.pixoo.drawBuffer(...args);
  }

  async drawText(...args) {
    return this.pixoo.drawText(...args);
  }

  async drawImage(imageBuffer) {
    try {
      await this.pixoo.drawImage(
        imageBuffer,
        [0, 0],
        "nearestNeighbor",
      );
    } catch (e) {
      console.error(e);
      console.error("Can't access Pixoom...");
    }
  }
}

module.exports = Pixoo;
