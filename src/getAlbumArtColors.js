const { getAverageColor } = require("fast-average-color-node");
const getColors = require("get-image-colors");
const chroma = require("chroma-js");
const imageType = require("image-type");

async function getAlbumArtColors(imageBuffer) {
  const { mime } = imageType(imageBuffer);

  const { rgb: averageColor } = await getAverageColor(imageBuffer);
  const colors = await getColors(imageBuffer, mime);

  const [highestContrastColor] = colors.sort((a, b) => {
    const aContrast = chroma.contrast(averageColor, a);
    const bContrast = chroma.contrast(averageColor, b);
    return aContrast < bContrast;
  });

  if (chroma.contrast(averageColor, highestContrastColor) > 7) {
    return highestContrastColor.rgb();
  }

  if (chroma.contrast(averageColor, [0, 0, 0]) > 7) {
    return [0, 0, 0];
  }

  if (chroma.contrast(averageColor, [255, 255, 255]) > 7) {
    return [255, 255, 255];
  }

  return;
}

module.exports = getAlbumArtColors;
