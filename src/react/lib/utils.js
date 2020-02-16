export const getBackgroundImage = (image, text) =>
  text
    ? `linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url("${encodeURI(
        image
      )}")`
    : `url("${encodeURI(image)}")`
