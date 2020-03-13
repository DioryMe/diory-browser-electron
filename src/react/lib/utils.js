export const getBackgroundImage = (image, text, gradient='255, 255, 255, 0.8') =>
  text
    ? `linear-gradient(rgba(${gradient}),rgba(${gradient})), url("${encodeURI(
        image
      )}")`
    : `url("${encodeURI(image)}")`
