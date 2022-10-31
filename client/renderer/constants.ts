export const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  FIND_PASSWORD: "/find-password",
  CREATE_PAGE: "/create-page",
  SIGNUP: "/signup",
};

export const TAG_LIST = [
  { type: "text" },
  { type: "list" },
  { type: "calendar" },
  { type: "date picker" },
  { type: "input" },
  { type: "file upload" },
  { type: "table" },
  { type: "check box" },
  { type: "radio button" },
  { type: "drop down" },
  { type: "text area" },
  { type: "hyperlink" },
];

// API
const API = "api/";
const USERS = "users/";
export const USERS_API = {
  VERIFICATION: API + USERS + "verification",
  SIGNUP: API + USERS + "signup",
};
