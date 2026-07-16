// Central place for app-wide constants. Keeps magic strings/numbers out of components.

export const APP_NAME = "Finly";
export const APP_TAGLINE = "Know where every rupee goes.";

export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
};

// Placeholder base URL — the backend team will replace this once APIs are live.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const AUTH_TOKEN_KEY = "finly_auth_token";

// Simple, readable validation patterns shared by Login & Register forms.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_RULES = {
  minLength: 8,
};
