import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { urlUsers } from "./endpoints.ts";
import { urlOrders } from "./endpoints.ts";
import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap'

export function Orders() {
    const orders = useRef(null);
    const peuple = useRef(null);
    const dict = useRef(null);
    const [r, setR] = useState(false);
    const [per, setper] = useState({});
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState();

    function handleClick(index) {
        if (open == false) {
            setOpen(!open);

        }
        setOpenIndex(index);
        console.log("open", openIndex);
    }


    const getOrders = async () => {
        await axios.get(urlOrders)
            .then(response => {
                if (response.status < 299) {
                    console.log("orders", response.data);
                    var g = [];
                    response.data.forEach(async o => {
                        const res = await axios.get(urlUsers + `/${o.userId}`)
                            .then(response => {
                                if (response.status < 299) {
                                    console.log(response.data);
                                    // peuple.current.push(response.data);
                                    g.push(response.data);
                                }
                            })
                            .catch((error) => console.log(error));
                        console.log("res: ", res);
                    });

                    orders.current = response.data;
                    peuple.current = g;
                    console.log("ggg", peuple.current);
                    console.log("orders.current: ", orders.current);

                }
            })
            .catch((error) => console.log(error));
        return peuple.current;
    }

    useEffect(() => {
        // debugger
        async function fetchData() {
            // You can await here
            dict.current = await getOrders();

            setTimeout(() => {
                setR(true);
            }, 100);
            // ...
        }
        fetchData();

        //  console.log("ggg",peuple.current);

        console.log("dict: ", dict.current);
    }, []);


    return (
        // <></>
        <>
            {r != false &&
                <>
                    {
                        orders.current.map((o, i) => {
                            var date = new Date(o.orderDetails.date);
                            var year = date.getFullYear();
                            var dateVal = date.getDate();
                            var formattedDate = dateVal + '/' + (date.getMonth() + 1) + '/' + year;
                            console.log(date);
                            return (
                                <>
                                    <html dir="rtl">
                                        <div className="card">
                                            <div className="card-header">
                                                {peuple.current[i].storeName}
                                            </div>
                                            <div className="card-body">
                                                <Button variant="success" className="mb-4" onClick={() => handleClick(i)}>
                                                    פרטי הזמנה
                                                </Button>
                                                <Collapse key={i} in={open && openIndex == i}>
                                                    <div id="collapsePanel">
                                                        <table class="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    {/* <th scope="col">#</th> */}
                                                                    <th scope="col">תאור</th>
                                                                    <th scope="col">קוד</th>
                                                                    <th scope="col">מחיר</th>
                                                                    {/* <th scope="col">צבעים</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {
                                                                    o.orderDetails.details.map((d, i2) => {
                                                                        console.log("ddd", d);
                                                                        <tr>
                                                                            {/* <th scope="row">{i2 + 1}</th> */}
                                                                            <td>{d.description}</td>
                                                                            <td>{d.code}</td>
                                                                            <td>{d.price}</td>
                                                                            {/* <td>
                                                                                <ol>
                                                                                    {

                                                                                        d.colorAmount.map((ca, i) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <li>{ca.color} amount: {ca.amount}</li>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ol>
                                                                            </td> */}
                                                                        </tr>
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div class="card-footer text-muted">
                                                {formattedDate}
                                            </div>
                                        </div>
                                    </html>
                                </>
                            )
                        })
                    }</>
            }
        </>
    )
}