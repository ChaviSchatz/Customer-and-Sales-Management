import axios from "axios";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";

export function Home(state) {
    const postUrl = urlUsers + "/userDetails";
    const { index } = useParams();
    const users = useSelector((state) => state.usersReducer);
    const user = users[index];
    const details = useRef("hhhh");

    useEffect(() => {
        const innerFunc = async () => {
            const res = await axios.post(postUrl, user)
                .then((response) => details.current = response.data)
                .catch((error) => console.log(error));
            console.log(details.current);
        }
        innerFunc();
    }, []);

    return (
        <> 
            <p>hello {details.current}</p>
        </>
    );
}