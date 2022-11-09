import "../styles/global.css";
import type { AppProps } from "next/app";
import { store, wrapper, persistor } from "../store";
import { Provider } from "react-redux";
import Layout from "../template/Layout";
import { PersistGate } from "redux-persist/integration/react";
import { useAppSelector } from "../hooks/reduxHook";
import axios from "axios";
import { USERS_API } from "../constants";
import React, { useEffect } from "react";
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const HOST = useAppSelector((state) => state.axiosState).axiosState;
  const reissueToken = async () => {
    const refreshExpiredAt = localStorage.getItem("refreshExpiredAt");
    if (refreshExpiredAt !== null) {
      const now = new Date();
      const needLoginDate = new Date(refreshExpiredAt);
      const isRefreshExpired = needLoginDate.getTime() - now.getTime() < 30000;
      if (isRefreshExpired) {
        persistor.purge();
        localStorage.removeItem("refreshExpiredAt");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessExpiredAt");
        localStorage.removeItem("accessToken");
        Router.push("/login");
        return;
      }
    }
    const accessExpiredAt = localStorage.getItem("accessExpiredAt");
    if (accessExpiredAt !== null) {
      const now = new Date();
      const needReissueDate = new Date(accessExpiredAt);
      const isAccessExpired = needReissueDate.getTime() - now.getTime() > 0;
      if (isAccessExpired) {
        try {
          const tokens = {
            accessToken: localStorage.getItem("accessToken")?.substring(7),
            refreshToken: localStorage.getItem("refreshToken")?.substring(7),
          };
          console.log(tokens);
          const { data } = await axios.post(
            `${HOST}${USERS_API.REISSUE}`,
            tokens
          );
          localStorage.setItem(
            "accessToken",
            `Bearer ` + data.data.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            `Bearer ` + data.data.refreshToken
          );
          localStorage.setItem(
            "accessExpiredAt",
            data.data.accessTokenExpiration
          );
          localStorage.setItem(
            "refreshExpiredAt",
            data.data.refreshTokenExpiration
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //   reissueToken();
  //   }, 300000);
  //   return () => clearInterval(timer);
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
