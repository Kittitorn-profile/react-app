// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/static/css/style.css" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"
          />
          <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="/static/vendor/node_modules/bootstrap/dist/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="/static/vendor/node_modules/owl.carousel/dist/assets/owl.carousel.min.css"
          />
          <link
            rel="stylesheet"
            href="/static/vendor/node_modules/owl.carousel/dist/assets/owl.theme.default.min.css"
          />
          <script
            type="text/javascript"
            src="/static/vendor/node_modules/jquery/dist/jquery.min.js"
          />
          <script
            type="text/javascript"
            src="/static/vendor/node_modules/bootstrap/dist/js/bootstrap.min.js"
          />
          <script
            type="text/javascript"
            src="/static/vendor/node_modules/owl.carousel/dist/owl.carousel.min.js"
          />
          <script
            type="text/javascript"
            src="/static/vendor/node_modules/popper.js/dist/umd/popper.min.js"
          />
          {styleTags}
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
