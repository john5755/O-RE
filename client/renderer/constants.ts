export const PATH = {
  MAIN: "/",
  LOGIN: "/login",
  FIND_PASSWORD: "/find-password",
  CREATE_PAGE: "/create-page",
  SIGNUP: "/signup",
  ACCOUNT_OPTIONS: "/account-options",
  CREATE_GROUP: "/create-group",
};

export const TAG_LIST = [
  { type: "text", width: "100px", height: "100px" },
  { type: "list", width: "100px", height: "100px" },
  { type: "calendar", width: "100px", height: "100px" },
  { type: "date picker", width: "100px", height: "100px" },
  { type: "input", width: "100px", height: "100px" },
  { type: "file upload", width: "100px", height: "100px" },
  { type: "table", width: "100px", height: "100px" },
  { type: "check box", width: "100px", height: "100px" },
  { type: "radio button", width: "100px", height: "100px" },
  { type: "drop down", width: "100px", height: "100px" },
  { type: "text area", width: "100px", height: "100px" },
  { type: "hyperlink", width: "100px", height: "100px" },
  {
    type: "button",
    width: "100px",
    height: "100px",
    color: "gray",
    textAlign: "center",
  },
];

export const layoutInfo = {
  onlyPage: new Set<string>(),
  withOnlyNavBar: new Set<string>(),
};

layoutInfo.onlyPage.add(PATH.LOGIN);
layoutInfo.onlyPage.add(PATH.FIND_PASSWORD);
layoutInfo.onlyPage.add(PATH.SIGNUP);
layoutInfo.withOnlyNavBar.add(PATH.CREATE_PAGE);
layoutInfo.withOnlyNavBar.add(PATH.CREATE_GROUP);

export const BASIC_PHOTO_URL: string =
  "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/TeamDefaultImg.png";
