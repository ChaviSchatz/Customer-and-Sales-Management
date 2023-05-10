import { urlUsers } from './endpoints.ts';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';


export function ClientManagement() {
    const users = useRef(null);
    const temp = useRef(null);
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState();

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


    function handleClick(index) {
        if (open == false || index == openIndex) {
            setOpen(!open);

        }
        setOpenIndex(index);
        console.log("open", openIndex);
    }

    return (<>

        <table class="table table-striped" dir='rtl'>
            <thead>
                <tr >
                    {/* <th scope="col">#</th> */}
                    <th scope="col">שם לקוח</th>
                    <th scope="col">טלפון</th>
                    <th scope="col">שם החנות</th>
                    {/* <th scope="col">כתובת למשלוח</th> */}
                </tr>
            </thead>
        </table>

        {r != false &&
            users.current.map((d, i) => {
                return (
                    <>
                        <html>
                            <div className="card">
                                {/* <div className="card-header" style={{"paddingLeft":"-50%"}}> */}
                                    <table dir='rtl'>
                                        <tbody >
                                            <th scope="col">{d.name}</th>
                                            <th scope="col">{d.phoneNumber}</th>
                                            <th scope="col">{d.storeName}</th>
                                        </tbody>
                                    </table>
                                    <div style={{ "margin": "20px" }}>
                                            <Button variant="success" onClick={() => handleClick(i)} >
                                                פרטי כתובת
                                            </Button>
                                        </div>
                                {/* </div> */}
                                <br></br>
                                <div className="card-header">
                                    <Collapse key={i} in={open && openIndex == i} >
                                        <div id="collapsePanel" dir='rtl'>
                                            <p>עיר : {d.address.city}</p>
                                            <p>רחוב : {d.address.street}</p>
                                            <p>דירה : {d.address.floor}</p>
                                            <p>הערות כתובת : {d.address.remarks}</p>
                                            {/* <table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">עיר</th>
                                                        <th scope="col">רחוב</th>
                                                        <th scope="col">דירה</th>
                                                        <th scope="col">הערות כתובת</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <td>{d.address.city}</td>
                                                    <td>{d.address.}</td>
                                                    <td>{d.address.}</td>
                                                    <td>{d.address.}</td>
                                                </tbody>
                                            </table> */}
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </html>

                    </>
                )
            })
        }


    </>);
}