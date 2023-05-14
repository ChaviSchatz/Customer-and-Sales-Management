import { urlUsers } from './endpoints.ts';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';
import { HeaderManager } from './HeaderManager.js';


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
            users.current = users.current.sort((a, b) => (a.name < b.name ? -1 : 1));
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
        <header>
            <HeaderManager></HeaderManager>
        </header>

        {r != false &&
            users.current.map((d, i) => {
                return (
                    <>
                        <html>
                            <div className="card">
                                <table dir='rtl'>
                                    <tbody >
                                        <tr scope="col"><span style={{ fontWeight: 'bold' }}> שם:  </span>{d.name}</tr>
                                        <tr scope="col"><span style={{ fontWeight: 'bold' }}> טלפון:  </span>{d.phoneNumber}</tr>
                                        <tr scope="col"><span style={{ fontWeight: 'bold' }}> שם החנות:  </span>{d.storeName}</tr>
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