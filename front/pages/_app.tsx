import "../styles/global.css";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../component/navbar";
import { RecoilRoot } from "recoil";
// import Script from "next/script";
// import Footer from "../component/footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>테이스트널리티</title>
      </Head>
      {/* <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1431674278951978"
        crossOrigin="anonymous"
      ></Script> */}
      <div>
        <RecoilRoot>
          <NavBar></NavBar>
          <Component {...pageProps}></Component>
        </RecoilRoot>
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
