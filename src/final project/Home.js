import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";

export function Home(state) {
    const { index } = useParams();
    const postUrl = urlUsers + `/${index}`;
    const users = useSelector((state) => state.usersReducer);
    const user = users[index];
    const details = useRef({});
    const [b, setB] = useState();
   

    useEffect(() => {
        debugger
        const r = axios.get(urlUsers).then((response) => {
            // setB(response.data);
            console.log(response.data);
            console.log(b);

        })
        .catch((error) => console.log(error));
        const res = axios.post(postUrl, user)
        .then((response) => {
            console.log(response.status);
            if (response.status < 300) {
                details.current = response.data;
                
                console.log(response.data.emailAddress);
                console.log(details.current.emailAddress);
            }
            else {
                console.log("the http request faild");
                ///add ups there is a problem////
            }
        })
        .catch((error) => console.log(error));
    console.log(details);
    }, []);

    return (
        <>
            {/* <p>hello {b[0].emailAddress}</p> */}
            {/* <p>hello {details.current.emailAddress}</p> */}
        </>
    );
}