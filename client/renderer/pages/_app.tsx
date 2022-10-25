import "../styles/global.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import Layout from "../template/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
