import { Provider } from "react-redux";
import { store } from "../src/app/store";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { RecoveryProvider } from "@/components/recoverycontext";



export default function App({ Component, pageProps }) {
  return (
    <RecoveryProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </Provider>
    </RecoveryProvider>
  );
}
