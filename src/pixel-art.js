require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const LastFM = require("./lastFm.js");
const Pixoo = require("./pixoo.js");
const getAlbumArtColors = require("./getAlbumArtColors.js");
const compareImages = require("./compareImages.js");

const pixoo = new Pixoo();
const lastFm = new LastFM();

let isPixooInitialised = false;
let currentAlbumArt = "";
async function showCurrentListeningSongs() {
  const recentAlbumArt = await lastFm.getRecentAlbumArt();

  if (!recentAlbumArt || currentAlbumArt === recentAlbumArt) {
    return;
  }

  const response = await fetch(recentAlbumArt);
  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const isDefaultImage = await compareImages(
    __dirname + "/lastfm-default-image.png",
    imageBuffer,
  );

  if (isDefaultImage) {
    console.log(
      `${new Date().toISOString()} - No image on LastFM. Skipping...`,
    );
    return;
  }

  currentAlbumArt = recentAlbumArt;
  console.log(
    `${new Date().toISOString()} - Drawing new image: ${recentAlbumArt}`,
  );

  const albumArtColor = await getAlbumArtColors(imageBuffer);

  await pixoo.drawImage(imageBuffer);

  const dateNow = new Date();
  const timeNow = `${dateNow.getHours()}:${dateNow.getMinutes()}`;
  const textColor = albumArtColor || [255, 255, 255];
  await pixoo.drawText(timeNow, [3, 3], textColor);

  await pixoo.drawBuffer();
}

pixoo.init().then(() => {
  if (!isPixooInitialised) {
    isPixooInitialised = true;
    showCurrentListeningSongs();
    setInterval(() => {
      showCurrentListeningSongs();
    }, 10000); // every 10 secs
  }
});
