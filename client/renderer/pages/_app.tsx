import "../styles/global.css";
import type { AppProps } from "next/app";
import { store, wrapper, persistor } from "../store";
import { Provider } from "react-redux";
import Layout from "../template/Layout";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
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
