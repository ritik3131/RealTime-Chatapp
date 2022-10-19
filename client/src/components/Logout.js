import React from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { userAction } from "../store";

function Logout() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(userAction.logout());
        localStorage.clear();
        window.location.reload();
    };
    const clientId =
        process.env.REACT_APP_CLIENT_ID ||
        "464107833749-6lmogcd5382qg3738a347ggu7nu08fus.apps.googleusercontent.com";
    return (
        <>
            <GoogleLogout
                style={{ padding: 0, borderWidth: 0, background: "none" }}
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logoutHandler}
            ></GoogleLogout>
        </>
    );
}

export default Logout;
