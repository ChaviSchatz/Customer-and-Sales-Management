
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Update } from "./Update";

export function Home() {
    const user = useSelector((state) => state.usersReducer);
    const [details, setdetails] = useState(null);
    const [serverError, setserverError] = useState(false);
    const [navToUpdate, setnavToUpdate] = useState(false);
    console.log("details",details);

    useEffect(() => {
        debugger
        console.log("hhh" ,user);
        setdetails(user);
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
                    <Update/>
                }
            {
                serverError == true &&
                <p>Uoooops we have problem now</p>
            }
        </>
    );
}