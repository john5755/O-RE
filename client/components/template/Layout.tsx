import styled from '@emotion/styled';
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

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <BaseLayout>
      <HeaderNav></HeaderNav>
      <div>{children}</div>;
    </BaseLayout>
  );
}
