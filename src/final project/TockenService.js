import axios from "axios";
import { urlUsers } from "./endpoints.ts";


export const getTokenObj = () =>{
    var token = sessionStorage.getItem("tokens");
    var refreshToken = sessionStorage.getItem("refreshToken");
    let tokens = {
        "token" : token,
        "refreshToken" : refreshToken
    }
    return tokens;
}
 const getToken = () =>{
    var tokens = sessionStorage.getItem("token");
    return tokens;
}

export const setTokens = (tokens) =>{
    sessionStorage.setItem("token", tokens.token);
    sessionStorage.setItem("refreshToken", tokens.refreshToken);
}

export const refreshAndUpdateTokens = async (url) => {
    const token =  getTokenObj();
    await axios.post(url + "/refresh", token)
            .then((response) => {
                if (response.status < 300) {
                    setTokens(response.data);
                }
                else {
                    console.log("the http request faild");
                }
            })
            .catch((error) => console.log(error));
}