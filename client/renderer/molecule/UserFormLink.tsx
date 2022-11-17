import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const LinkContainer = styled.ul`
  width: 100%;
  text-align: center;
  padding: 0;
`;

const LinkOptions = styled.li`
  display: inline-block;
  list-style: none;
  :first-of-type {
    border-right: 1px solid var(--main-color);
    padding-right: 10px;
  }
  :last-child {
    padding-left: 10px;
  }
  > a {
    color: var(--main-color);
  }
`;

interface UserLinkProps {
  firstPath: string;
  firstPathName: string;
  secondPath: string;
  secondPathName: string;
}

export default function UserFormLink(props: UserLinkProps) {
  return (
    <LinkContainer>
      <LinkOptions>
        <Link href={props.firstPath}>{props.firstPathName}</Link>
      </LinkOptions>
      <LinkOptions>
        <Link href={props.secondPath}>{props.secondPathName}</Link>
      </LinkOptions>
    </LinkContainer>
  );
}
