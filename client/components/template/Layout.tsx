import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import HeaderNav from '../molecule/HeaderNav';

const BaseLayout = styled.div`
  min-width: 1440px;
  width: 100%;
  padding-left: 185px;
  padding-right: 180px;
  @media (min-width: 1440px) {
    padding-left: calc((100vw - 1440px) / 2 + 185px);
    padding-right: calc((100vw - 1440px) / 2 + 180px);
  }
`;

const noNavbarPathnames = ['/login'];

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { pathname } = useRouter();

  return (
    <>
      {!noNavbarPathnames.includes(pathname) && <HeaderNav></HeaderNav>}
      <BaseLayout>{children}</BaseLayout>
    </>
  );
}
