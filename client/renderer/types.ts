export interface GroupUserType {
  userId: number;
  name: string;
  email: string;
  nickName: string;
  role: string;
  profileImg?: string;
}

export interface GroupOptions extends Object {
  teamId: number;
  name: string;
  profileUrl: string | null | ArrayBuffer;
}

export interface UserProfileOptions extends Object {
  email: string;
  name: string;
  nickname: string;
  role: string;
  profileImage: string;
}
