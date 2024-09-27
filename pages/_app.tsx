import "./_app.css";
import '../output.css';
import { ReactNode } from "react";

interface PropTypes {
  Component: ReactNode | undefined,
  pageProps: any
}
function MyApp({ Component, pageProps }: PropTypes) {
  return (<>
    <Component {...pageProps} />
  </>
  )
}


export default MyApp;
