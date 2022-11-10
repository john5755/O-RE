import React from "react";
import { SetStateAction, Dispatch } from "react";

export interface TeamUserType {
  userId: number;
  name: string;
  email: string;
  nickname: string;
  role: string;
  profileImage?: string;
}

export interface TeamOptions {
  teamId: number;
  name: string;
  imageUrl: string | null | ArrayBuffer;
}

export interface PageOption {
  pageId: number;
  name: string;
  pageUserRole: string;
}

export interface SelectPageType {
  idx: number;
  pageId: number;
}

export interface UserProfileOptions extends Object {
  email: string;
  name: string;
  nickname: string;
  role: "OWNER" | "LEADER" | "ADMIN" | "USER";
  profileImage: string;
}

export interface BarProps {
  selectedTeamId: SelectTeamType;
  setSelectedTeamId: Dispatch<SetStateAction<SelectTeamType>>;
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
  name?: string;
  style?: React.CSSProperties;
}

export interface TagType {
  type: string;
  tagProps: TagPropsType;
}

export interface InputType {
  [key: string]: string | string[];
}

export interface SelectTeamType {
  idx: number;
  teamId: number;
}

export interface ServerRoleMenues {
  OWNER: string;
  ADMIN: string;
  USER: string;
}

export interface TeamRoleMenues {
  OWNER: string;
  LEADER: string;
  MANAGER: string;
  MEMBER: string;
}
