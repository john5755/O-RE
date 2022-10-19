import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { H2 } from '../styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { setLogOut } from '../../slices/loginSlice';

const Container = styled.div`
  height: 52px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 1440px;
  width: 100%;
  height: 100%;
  padding-left: 185px;
  padding-right: 180px;
  @media (min-width: 1440px) {
    padding-left: calc((100vw - 1440px) / 2 + 185px);
    padding-right: calc((100vw - 1440px) / 2 + 180px);
  }
`;

const NavMenus = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const NavMenu = styled.div<{ selected?: boolean }>`
  display: flex;
  font-size: var(--font-size-200);
  font-weight: 500;
  padding: 3px 23px 0 23px;
  cursor: pointer;
  align-items: center;
  height: 100%;
  border-bottom: 3px solid
    ${({ selected }) => (selected ? 'var(--main-color)' : 'transparent')};
`;

const UserMenus = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: var(--font-size-200);
  font-weight: 500;
  white-space: nowrap;
  margin: 0 24px 0 12px;
  cursor: pointer;
`;

const CustomMenu = styled(Menu)`
  .MuiPopover-paper {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const CustomMenuItem = styled(MenuItem)`
  color: black;
  &:hover {
    background-color: var(--main-color);
    color: white;
  }
`;
const menuList = [
  { name: '채용공고', link: '/recruit-notification' },
  { name: '자기소개서', link: '/resume-list' },
  { name: '이력서', link: '/spec-description' },
  { name: '합격 자소서', link: '/resume-example' },
];

export default function HeaderNav() {
  const { pathname } = useRouter();
  const router = useRouter();
  const isLogin = useAppSelector(state => state.login.isLogin);
  const name = useAppSelector(state => state.login.name);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogOut());
    router.push('/');
  };

  return (
    <Container>
      <NavContainer>
        <Link href="/">
          <H2
            style={{
              color: 'var(--main-color)',
              fontWeight: 'bold',
              cursor: 'pointer',
              paddingRight: '23px',
            }}
          >
            O:RE
          </H2>
        </Link>
        <NavMenus>
          {menuList.map(menu => (
            <Link href={menu.link} key={menu.name}>
              <NavMenu key={menu.name} selected={menu.link === pathname}>
                {menu.name}
              </NavMenu>
            </Link>
          ))}
        </NavMenus>
        {isLogin ? (
          <>
            <NotificationsIcon
              sx={{ color: 'var(--main-color)' }}
            ></NotificationsIcon>
            <UserMenus
              onClick={e => {
                handleClick(e);
              }}
            >
              <div>{name}</div>
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </UserMenus>
            <CustomMenu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <CustomMenuItem
                onClick={() => {
                  handleClose();
                  router.push('/user-dashboard');
                }}
              >
                마이페이지
              </CustomMenuItem>
              <CustomMenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                로그아웃
              </CustomMenuItem>
            </CustomMenu>
          </>
        ) : (
          <Link href="/login">
            <UserMenus>
              <AccountCircleOutlinedIcon
                sx={{ color: 'var(--main-color)' }}
              ></AccountCircleOutlinedIcon>
              <div style={{ paddingLeft: '12px' }}>로그인</div>
            </UserMenus>
          </Link>
        )}
      </NavContainer>
    </Container>
  );
}
