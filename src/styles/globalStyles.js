const nordColor = {
  night1: "#2E3440",
  night2: "#3B4252",
  night3: "#434C5E",
  night4: "#4C566A",
  snow1: "#D8DEE9",
  snow2: "#E5E9F0",
  snow3: "#ECEFF4",
  frost1: "#8FBCBB",
  frost2: "#88C0D0",
  frost3: "#81A1C1",
  frost4: "#5E81AC",
  aurora1: "#BF616A",
  aurora2: "#D08770",
  aurora3: "#EBCB8B",
  aurora4: "#A3BE8C",
  aurora5: "#B48EAD",
};
const logo = nordColor.frost1;
const textColorDark = nordColor.snow3;
const backgroundColorDarkPrimary = nordColor.night1;
const backgroundColorDarkSecondary = nordColor.night2;


const textColorLight = nordColor.night1;
const backgroundColorLightPrimary = nordColor.snow1;
const backgroundColorLightSecondary = nordColor.snow3;

export const themeDark = {
  ...nordColor,
  navigationBar: {
    backgroundColor: backgroundColorDarkSecondary,
    color: textColorDark,
  },
  text: textColorDark,
  background: backgroundColorDarkPrimary,
  logo: {
    color: logo,
  },
  loader: textColorDark,
  table: {
    backgroundColor: backgroundColorDarkSecondary,
    color: textColorDark,
  },
  cardSelected: {
    backgroundColor: nordColor.night4,
    color: textColorDark,
  },
  cardNormal: {
    backgroundColor: backgroundColorDarkSecondary,
    color: textColorDark,
  },
};

export const themeLight = {
  ...nordColor,
  navigationBar: {
    backgroundColor: backgroundColorDarkPrimary,
    color: textColorLight,
  },
  text: textColorLight,
  background: backgroundColorLightPrimary,
  logo: {
    color: logo,
  },
  loader:textColorLight,
  table: {
    backgroundColor: backgroundColorLightSecondary,
    color: textColorLight,
  },
  cardSelected: {
    backgroundColor: nordColor.snow1,
    color: textColorLight,
  },
  cardNormal: {
    backgroundColor: backgroundColorLightSecondary,
    color: textColorLight,
  },
};

export default themeDark;
