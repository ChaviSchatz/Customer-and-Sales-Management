import { urlUsers } from './endpoints.ts';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';


export function ClientManagement() {
    const users = useRef(null);
    const temp = useRef(null);

    const [r, setR] = useState(false);
    const [add, setAdd] = useState(false);


    const res = async () => {
        await axios.get(urlUsers)
            .then(response => {
                if (response.status < 299) {
                    console.log("response- ", response.data);
                    users.current = response.data;

                }

            })
            .catch((error) => console.log(error));
        console.log("u", users.current);

        return users.current;
    }
    useEffect(() => {
        async function fetchData() {
            temp.current = await res();

            setTimeout(() => {
                setR(true);
            }, 100);
        }
        fetchData();
    }, []);
    // let r = res.Json;

    // console.log("u", users.current);


    return (<>
        {/* key={i} in={open && openIndex == i} */}
        {/* <Collapse > */}
        <div id="collapsePanel">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">שם לקוח</th>
                        <th scope="col">טלפון</th>
                        <th scope="col">שם החנות</th>
                        <th scope="col">כתובת למשלוח</th>

                    </tr>
                </thead>
                <tbody>
                    {r != false &&
                        users.current.map((d, i2) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{i2 + 1}</th>
                                        <td>{d.name}</td>
                                        <td>{d.phoneNumber}</td>
                                        <td>{d.storeName}</td>
                                        {/* <td><button onClick={setAdd(true)}>פרטי כתובת</button></td> */}
                                    </tr>
                                    {/* {add != false && <>{
                                        users.current[i2].map((a, i) => {
                                            return (
                                                <>
                                                    <td>{a.city}</td>
                                                    <td>{a.street}</td>
                                                    <td>{a.city}</td></>
                                            )
                                        })
                                    }</>} */}
                                </>
                            )
                        })
                    }
                    
                </tbody>
            </table>
            
        </div>
        {/* </Collapse> */}
    </>);
}