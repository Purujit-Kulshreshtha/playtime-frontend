import setupBackground from "./assets/setup-background.jpeg";
import profileIcon from "./assets/profile-icon.webp";

export const ROUTES = {
  getTimezoneRoute: (name: string) => `/timezone/${name}`,
};

export const IMAGES = {
  setupBackground,
  profileIcon,
};

export const LOCAL_STORAGE_KEYS = {
  user: "user",
};
