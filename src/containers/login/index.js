/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from "react";
import OpenLogin from "@toruslabs/openlogin";
import { verifiers } from "../../utils/config";
import "./style.scss";

function Login() {
  async function handleLogin() {
    const sdkInstance = new OpenLogin({ 
      clientId: "YOUR_PROJECT_ID", 
      network: "testnet"
    });
    await sdkInstance.login({
      loginProvider: "google",
      redirectUrl: `${window.origin}/polygon`,
    });
  }
  return (
    <div className="loginContainer">
      <div className="loginContainer">
        <h1 style={{ textAlign: "center" }}>Openlogin x Polygon</h1>
        <div onClick={handleLogin} className="btn">
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
