import { urlUsers } from './endpoints.ts';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';
import { HeaderManager } from './HeaderManager.js';
import { getToken } from './TockenService.js';


export function ClientManagement() {
    const users = useRef(null);
    const temp = useRef(null);
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState();
    const [r, setR] = useState(false);

    const res = async () => {
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.get(urlUsers, config)
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
        <br></br>
        <br></br>
        {r != false &&
            users.current.map((d, i) => {
                return (
                    <>
                            <div className="card">
                                <table dir='rtl'>
                                    <tbody>
                                        <tr scope="col"><span style={{ fontWeight: 'bold' }}> שם:  </span>{d.name}</tr>
                                        <tr scope="col"><span style={{ fontWeight: 'bold' }}> טלפון:  </span>{d.phoneNumber}</tr>
                                        <tr scope="col"><span style={{ fontWeight: 'bold' }}> שם החנות:  </span>{d.storeName}</tr>
                                    </tbody>
                                </table>
                                <div style={{ "margin": "20px" }}>
                                    <Button variant="Light" style={{border: "2px solid #95532f", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
                                     onClick={() => handleClick(i)} >
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
                    </>
                )
            })
        }


    </>);
}