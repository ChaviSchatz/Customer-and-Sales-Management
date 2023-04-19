


import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";
import { HomeChild } from "./HomeChild";
import { Update } from "./Update";

export function Home(state) {
    const { index } = useParams();
    const postUrl = urlUsers + `/${index}`;
    const users = useSelector((state) => state.usersReducer);
    const user = users[index];
    const [details, setdetails] = useState(null);
    const [ServerError, setServerError] = useState(false);


    const func = async () => { await axios.post(postUrl, user)
    .then((response) => {
        console.log("kkkk", response.data);
        if (response.status < 300) {
            const userData = response.data;
            setdetails(userData);
        }
        else {
            setServerError(true);
            console.log("the http request faild");

        }
    })
    .catch((error) => console.log(error));}
    
    useEffect(() => {
        func();
    },[]);

  

    return (
        <>
            {
                details != null && 
                <p> gggggg {details.name}</p>
                // <>
                // <p>{details.name}</p>
                // <br></br>
                // <button onClick={() => {
                //     <Update details={details}/>
                // }}>
                // לעדכון
                // </button>
                // </>                 
            }
            {
                ServerError==true &&
                <p>Uoooops we have problem now</p>
            }
        </>
    );
}