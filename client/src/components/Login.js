import axios from "axios";
import React from "react";
import { GoogleLogin } from "react-google-login";

function Login() {
  const responseGoogle = async (response) => {
    const tokenId = response.tokenId;
    const responseData=await axios.post("http://localhost:9000/api/vi/google/login", { tokenId });
    const data=responseData.data;
    console.log("Request:",data);
  };
  console.log(process.env.REACT_APP_CLIENT_ID)
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default Login;
