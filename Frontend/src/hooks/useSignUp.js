import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import { useAPI } from "./useAPI";

function useSignUp(){
    const {login, loading: loadingSession, loginError, error: errorSession} = useContext(SessionContext);
    const {loading: loadingAPI, error, fetchAPI} = useAPI();
    const [signUpError, setSignUpError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(loginError) setSignUpError(loginError);
        if(errorSession) setSignUpError(errorSession);
        if(error) setSignUpError(error);
    }, [loginError, errorSession, error]);

    useEffect(() => {
        if(loadingSession) setLoading(true);
        if(loadingAPI) setLoading(true);
        else setLoading(false);
    }, [loadingSession, loadingAPI]);

    const signUp = async (username, password, email, name) => {
        const res = await fetchAPI({
            method: 'POST',
            route: 'auth/register',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                name,
            }),
            log: true,
            showReply: true,
        });

        if(res) {
            if(res.error){
                setSignUpError(res);
            } else {
                login(username, password);
            }
        }
    }

    return {signUp, signUpError, loading};
}

export {useSignUp};