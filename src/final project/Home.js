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
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const innerFunc = () => {
            const res = axios.post(postUrl, user)
                .then((response) => {setDetails(response.data);
                    console.log(response.data)
                })
                .catch((error) => console.log(error));
            console.log(details);
        }
        innerFunc();
    }, []);

    return (
        <> 
            <p>hello {details}</p>
        </>
    );
}