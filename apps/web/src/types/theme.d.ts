import "react";

interface Theme {
  defaultColorScheme: string;
  breakpoints: Breakpoints;
  direction: string;
  components: Components;
  shape: Shape;
  typography: Typography;
  mixins: Mixins;
  shadows: string[];
  transitions: Transitions;
  zIndex: ZIndex;
  cssVarPrefix: string;
  colorSchemeSelector: string;
  rootSelector: string;
  colorSchemes: ColorSchemes;
  font: Font;
  vars: Vars;
  palette: Palette;
  opacity: Opacity;
  overlays: string[];
}

interface Breakpoints {
  keys: string[];
  values: Values;
  unit: string;
}

interface Values {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface ColorSchemes {
  dark: Dark;
  light: Light;
}

interface Dark {
  palette: Palette;
  opacity: Opacity;
  overlays: string[];
}

interface Opacity {
  inputPlaceholder: number;
  inputUnderline: number;
  switchTrackDisabled: number;
  switchTrack: number;
}

interface Palette {
  mode: string;
  common: Common;
  primary: ColorScheme;
  secondary: ColorScheme;
  error: ColorScheme;
  warning: ColorScheme;
  info: ColorScheme;
  success: ColorScheme;
  grey: ColorShades;
  contrastThreshold: number;
  tonalOffset: number;
  text: Text;
  divider: string;
  background: Background;
  action: PurpleAction;
  Alert: Alert;
  AppBar: AppBar;
  Avatar: Avatar;
  Button: Button;
  Chip: Chip;
  FilledInput: FilledInput;
  LinearProgress: LinearProgress;
  Skeleton: Skeleton;
  Slider: Slider;
  SnackbarContent: SnackbarContent;
  SpeedDialAction: SpeedDialAction;
  StepConnector: StepConnector;
  StepContent: StepConnector;
  Switch: Switch;
  TableCell: StepConnector;
  Tooltip: Skeleton;
  dividerChannel: string;
}

interface Alert {
  errorColor: string;
  infoColor: string;
  successColor: string;
  warningColor: string;
  errorFilledBg: string;
  infoFilledBg: string;
  successFilledBg: string;
  warningFilledBg: string;
  errorFilledColor: string;
  infoFilledColor: string;
  successFilledColor: string;
  warningFilledColor: string;
  errorStandardBg: string;
  infoStandardBg: string;
  successStandardBg: string;
  warningStandardBg: string;
  errorIconColor: string;
  infoIconColor: string;
  successIconColor: string;
  warningIconColor: string;
}

interface AppBar {
  defaultBg: string;
  darkBg: string;
  darkColor: string;
}

interface Avatar {
  defaultBg: string;
}

interface Button {
  inheritContainedBg: string;
  inheritContainedHoverBg: string;
}

interface Chip {
  defaultBorder: string;
  defaultAvatarColor: string;
  defaultIconColor: string;
}

interface FilledInput {
  bg: string;
  hoverBg: string;
  disabledBg: string;
}

interface LinearProgress {
  primaryBg: string;
  secondaryBg: string;
  errorBg: string;
  infoBg: string;
  successBg: string;
  warningBg: string;
}

interface Skeleton {
  bg: string;
}

interface Slider {
  primaryTrack: string;
  secondaryTrack: string;
  errorTrack: string;
  infoTrack: string;
  successTrack: string;
  warningTrack: string;
}

interface SnackbarContent {
  bg: string;
  color: string;
}

interface SpeedDialAction {
  fabHoverBg: string;
}

interface StepConnector {
  border: string;
}

interface Switch {
  defaultColor: string;
  defaultDisabledColor: string;
  primaryDisabledColor: string;
  secondaryDisabledColor: string;
  errorDisabledColor: string;
  infoDisabledColor: string;
  successDisabledColor: string;
  warningDisabledColor: string;
}

interface PurpleAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledBackground: string;
  disabledOpacity: number;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
  activeChannel: string;
  selectedChannel: string;
}

interface Background {
  paper: string;
  default: string;
  defaultChannel: string;
  paperChannel: string;
}

interface Common {
  black: string;
  white: string;
  background: string;
  onBackground: string;
  backgroundChannel: string;
  onBackgroundChannel: string;
}

interface ColorScheme {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
  contrastTextChannel: string;
}

interface ColorShades {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

interface Text {
  primary: string;
  secondary: string;
  disabled: string;
  icon?: string;
  primaryChannel: string;
  secondaryChannel: string;
}

interface Light {
  palette: Palette;
  opacity: Opacity;
  overlays: any[];
}

interface Components {}

interface Font {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  subtitle1: string;
  subtitle2: string;
  body1: string;
  body2: string;
  button: string;
  caption: string;
  overline: string;
  inherit: string;
}

interface Mixins {
  toolbar: Toolbar;
}

interface Toolbar {
  minHeight: number;
  "@media (min-width:0px)": MediaMinWidth0Px;
  "@media (min-width:600px)": Media;
}

interface MediaMinWidth0Px {
  "@media (orientation: landscape)": Media;
}

interface Media {
  minHeight: number;
}

interface Shape {
  borderRadius: number;
}

interface Transitions {
  easing: Easing;
  duration: Duration;
}

interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}

interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}

interface Typography {
  fontFamily: FontFamily;
  htmlFontSize: number;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: Body;
  h2: Body;
  h3: Body;
  h4: Body;
  h5: Body;
  h6: Body;
  subtitle1: Body;
  subtitle2: Body;
  body1: Body;
  body2: Body;
  button: Body;
  caption: Body;
  overline: Body;
  inherit: Inherit;
}

interface Body {
  fontFamily: FontFamily;
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  textTransform?: string;
}

enum FontFamily {
  VarFontFamily = "var(--font-family)",
}

interface Inherit {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

interface Vars {
  spacing: string;
  shape: Shape;
  shadows: string[];
  zIndex: ZIndex;
  font: Font;
  palette: Palette;
  opacity: Opacity;
  overlays: string[];
}

interface FluffyAction {
  active: string;
  hover: string;
  hoverOpacity: string;
  selected: string;
  selectedOpacity: string;
  disabled: string;
  disabledBackground: string;
  disabledOpacity: string;
  focus: string;
  focusOpacity: string;
  activatedOpacity: string;
  activeChannel: string;
  selectedChannel: string;
}

interface ZIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

declare module "@mui/material-pigment-css" {
  declare function useTheme(): Theme;
}
