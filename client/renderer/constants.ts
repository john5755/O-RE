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
  { type: "text", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "list", tagProps: { count: 5, style: { width: "100px", height: "100px" } } },
  { type: "calendar", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "date picker", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "input", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "file upload", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "table", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "check box", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "radio button", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "drop down", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "text area", tagProps: { style: { width: "100px", height: "100px" } } },
  { type: "hyperlink", tagProps: { style: { width: "100px", height: "100px" } } },
  {
    type: "button",
    tagProps: { style: { width: "100px", height: "100px", color: "gray", textAlign: "center" } },
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
