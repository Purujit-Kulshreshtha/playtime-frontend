import setupBackground from "./assets/setup-background.jpeg";
import profileIcon from "./assets/profile-icon.webp";
import soundZoneIcon from "./assets/SoundzoneIcon.svg";

export const ROUTES = {
  getTimezoneRoute: (name: string) => `/timezone/${name}`,
  getSettingsRoute: () => "/settings",
};

export const IMAGES = {
  setupBackground,
  profileIcon,
  soundZoneIcon,
};

export const LOCAL_STORAGE_KEYS = {
  user: "user",
};
