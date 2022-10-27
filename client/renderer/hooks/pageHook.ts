import { PATH } from "../constants";

export const pageInfo = {
  account: new Set<string>(),
  createGroup: new Set<string>(),
  creatPage: new Set<string>(),
};

pageInfo.account.add(PATH.LOGIN);
pageInfo.account.add(PATH.FIND_PASSWORD);
pageInfo.createGroup.add("/그룹생성페이지명");
pageInfo.creatPage.add(PATH.CREATE_PAGE);
