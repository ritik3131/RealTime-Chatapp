import axios from "axios";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { userAction } from "../store";

function Login() {
  const dispatch = useDispatch();
  const responseGoogle = async (response) => {
    const tokenId = response.tokenId;
    if (tokenId) {
      const responseData = await axios.post(
        "http://localhost:9000/api/vi/google/login",
        { tokenId }
      );
      const { isAuth, name, mailId } = responseData.data;
      if (isAuth) {
        localStorage.setItem("isAuth", JSON.stringify({ name, mailId, isAuthLocal:isAuth }));
        dispatch(userAction.login({ name, mailId, isAuth: true }));
      }
    }
  };
  const clientId =
    process.env.REACT_APP_CLIENT_ID ||
    "464107833749-6lmogcd5382qg3738a347ggu7nu08fus.apps.googleusercontent.com";
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default Login;
