<<<<<<< HEAD
import React from "react";
=======
import { SetStateAction, Dispatch } from "react";
>>>>>>> 545874d (feat: login 및 login 이후 유저 정보 업데이트)

export interface GroupUserType {
  userId: number;
  name: string;
  email: string;
  nickName: string;
  role: string;
  profileImg?: string;
}

interface TagPropsType {
  header?: string;
  target?: string;
  children?: string | string[];
  label?: string[];
  option?: string[];
  type?: string;
  placeholder?: string;
  count?: 2;
  row?: number;
  column?: number;
  href?: string;
  style?: React.CSSProperties;
}

export interface TagType {
  type: string;
  tagProps: TagPropsType;
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

export interface BarProps {
  selectedTeamId: number;
  setSelectedTeamId: Dispatch<SetStateAction<number>>;
}
