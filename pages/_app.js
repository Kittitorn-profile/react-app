// pages/_app.js
import React from "react";
import App from "next/app";
import Head from "next/head";
import { Footer, Header } from "../components/layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>React - App</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    );
  }
}

export default MyApp;
