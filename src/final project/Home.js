import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";
import { HomeChild } from "./HomeChild";

export function Home(state) {
    debugger
    const { index } = useParams();
    const postUrl = urlUsers + `/${index}`;
    const users = useSelector((state) => state.usersReducer);
    const user = users[index];
    const [details, setdetails] = useState(null);

    useEffect(() => {
        func();
    },[]);

    const func = () => {
        // axios.post(postUrl, user)
        axios.post(postUrl, user)
            .then((response) => {
                console.log(response.status);
                if (response.status < 300) {
                    const userData = response.data;
                    setdetails(userData);
                    console.log("response.data.emailAddress",response.data.emailAddress);
                    console.log("userData:" ,userData);
                }
                else {
                    console.log("the http request faild");
                    ///add ups there is a problem////
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <HomeChild details={details} />
        </>
    );
}