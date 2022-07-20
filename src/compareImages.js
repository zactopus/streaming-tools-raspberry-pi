const jimp = require("jimp");

async function compareImages(imageAData, imageBData) {
  const imageA = await jimp.read(imageAData);
  const imageB = await jimp.read(imageBData);

  const distance = jimp.distance(imageA, imageB); // Perceived distance
  const diff = jimp.diff(imageA, imageB); // Pixel difference

  return distance < 0.15 || diff.percent < 0.15;
}

module.exports = compareImages;
