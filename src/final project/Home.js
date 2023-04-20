
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";
import { Update } from "./Update";

export function Home() {
    const { index } = useParams();
    const postUrl = urlUsers + `/${index}`;
    const users = useSelector((state) => state.usersReducer);
    const user = users[index];
    const [details, setdetails] = useState(null);
    const [serverError, setserverError] = useState(false);
    const [navToUpdate, setnavToUpdate] = useState(false);



    const func = async () => {
        await axios.post(postUrl, user)
            .then((response) => {
               
                if (response.status < 300) {
                    const userData = response.data;
                    setdetails(userData);
                }
                else {
                    setserverError(true);
                    console.log("the http request faild");

                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        func();
    }, []);



    return (
        <>
            {
                details != null &&
                // <><p> hello {details.name}</p>
                // <p>{details.storeName}</p></>
                
                <>
                <p>{details.name}</p>
                <br></br>
                <p>{details.storeName}</p>
                <br></br>
                <button onClick={() => {
                    setnavToUpdate(true);   
                }}>
                לעדכון
                </button>
               
                </>                 
            }
             {
                    navToUpdate==true &&
                    <Update details={details}/>
                }
            {
                serverError == true &&
                <p>Uoooops we have problem now</p>
            }
        </>
    );
}