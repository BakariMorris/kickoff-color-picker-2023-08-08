import "./_app.css";
import '../output.css';
import { ReactNode } from "react";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

interface PropTypes {
  Component: ReactNode | undefined,
  pageProps: any
}
function MyApp({ Component, pageProps }: PropTypes) {
  return (<>
    <Component {...pageProps} />
    <Toaster/>
  </>
  )
}


export default MyApp;
