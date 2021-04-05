export const switchColors = (item) => {
  let customColor = "#000"
  switch (item) {
    case "controles-et-regulations":
      customColor = "#ff3d00";
      break;

    case "critiques-et-contournements":
      customColor = "#4caf50";
      break;

    case "marche-et-entreprises":
      customColor = "#f79845";
      break;

    case "infrastructures-et-technologies":
      customColor = "#ffeb3b";
      break;

    case "contexte-national-et-international":
      customColor = "#000";
      break;
  }

  return customColor;
}