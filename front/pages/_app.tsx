import "../styles/global.css";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../component/navbar";
// import Footer from "../component/footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>테이스트널리티</title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1431674278951978"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div>
        <NavBar></NavBar>
        <Component {...pageProps}></Component>
        {/* <Footer></Footer> */}
      </div>
      {/* <div>
        <Footer></Footer>
      </div> */}
      {/* <Component {...pageProps} /> */}
    </>
  );
}

export default MyApp;
