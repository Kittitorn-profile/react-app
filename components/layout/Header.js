import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

const AppHeader = (props) => {
  useEffect(() => {}, []);

  return (
    <div>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: 120, backgroundColor: "green" }}
      >
        <h2 className="" style={{ color: "#fff" }}>
          React App
        </h2>
      </div>

      <nav className="navbar navbar-light bg-light justify-content-center pl-4">
        <div>
          <a className="navbar-brand" href="/">
            Home
          </a>
          <a className="navbar-brand" href="/history">
            History
          </a>
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
