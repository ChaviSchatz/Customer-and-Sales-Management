import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { urlUsers } from "./endpoints.ts";
import { urlOrders } from "./endpoints.ts";
import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { HeaderManager } from "./HeaderManager.js";
import { getToken } from "./TockenService.js";
import "./cssFiles/orders.css";

export function Orders() {
    const orders = useRef(null);
    const peuple = useRef(null);
    const dict = useRef(null);
    const [r, setR] = useState(false);
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState();
    const navigate = useNavigate();

    function handleClick(index) {
        if (open == false || index == openIndex) {
            setOpen(!open);

        }
        setOpenIndex(index);
        console.log("open", openIndex);
    }

    const getOrders = async () => {

        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.get(urlUsers, config)
            .then(response => {
                if (response.status <= 299) {
                    peuple.current = response.data;
                }
            }).catch(err => { console.log(err); });
        await axios.get(urlOrders, config)
            .then(response => {
                response.data = response.data.sort(function (a, b) {
                    return new Date(b.orderDetails.date) - new Date(a.orderDetails.date);
                });
                if (response.status < 299) {
                    orders.current = response.data;
                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        async function fetchData() {
            await getOrders();

            setTimeout(() => {
                setR(true);
            }, 0);
        }
        fetchData();
    }, []);

    const doneOrder = async (i) => {
        console.log("orders[i]", orders.current[i]);
        orders.current[i].status = true;
        debugger
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.put(urlOrders, orders.current[i], config).then(res => console.log(res.data)).catch(err => console.log(err));
        navigate(`/helper/orders`);
        handleClick(i);
    }

    return (
        <>
            <header>
                <HeaderManager></HeaderManager>
            </header>
            <br></br>
            <h4 style={{ background: "linear-gradient(110deg,#f2d7dd 60%, #cd8393 60%)" }}>הזמנות אחרונות</h4>
            <br></br>
            {r != false &&
                <>
                    {
                        orders.current.map((o, i) => {
                            var date = new Date(o.orderDetails.date);
                            var year = date.getFullYear();
                            var dateVal = date.getDate();
                            var formattedDate = dateVal + '/' + (date.getMonth() + 1) + '/' + year;
                            return (
                                <>
                                    <div className="card" dir="rtl" key={i}>
                                        <div className="card-header" style={{}}>
                                            {
                                                o.status == false &&
                                                <p>הזמנה ממתינה
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ "marginRight": "10px" }} width="23" height="23" fill="currentColor" className="bi bi-bookmark-x" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z" />
                                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                    </svg>
                                                </p>

                                            }
                                            {
                                                o.status == true &&
                                                <p>הזמנה הושלמה
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ "marginRight": "10px" }} width="23" height="23" fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                    </svg>
                                                </p>
                                            }
                                            {
                                                peuple.current.map((p, ind) => {
                                                    {
                                                        return (
                                                            <>
                                                                {
                                                                    p.id == o.userId &&
                                                                    <>
                                                                        <p key={ind}>{p.storeName}</p>
                                                                    </>
                                                                }
                                                            </>
                                                        )
                                                    }
                                                })
                                            }

                                        </div>
                                        <div className="card-body">
                                            <Button variant="Light" style={{ border: "2px solid #95532f", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                                                className="mb-4" onClick={() => handleClick(i)}>
                                                פרטי הזמנה
                                            </Button>
                                            <Collapse key={i} in={open && openIndex == i}>
                                                <div id="collapsePanel">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">תאור</th>
                                                                <th scope="col">קוד</th>
                                                                <th scope="col">מחיר</th>
                                                                <th scope="col">צבעים</th>
                                                                {
                                                                    o.status == false &&
                                                                    <th scope="col">נכנס להזמנה</th>
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                o.orderDetails.details.map((d, i2) => {
                                                                    return (
                                                                        <>
                                                                            <tr key={i2}>
                                                                                <th scope="row">{i2 + 1}</th>
                                                                                <td>{d.description}</td>
                                                                                <td>{d.code}</td>
                                                                                <td>{d.price}</td>
                                                                                <td>
                                                                                    <ol>
                                                                                        {

                                                                                            d.colorAmount.map((ca, i) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <div style={{ display: "flex" }} key={i}>
                                                                                                            <li>{ca.color}:  <b>{ca.amount}</b></li>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ol>
                                                                                </td>
                                                                                {
                                                                                    o.status == false &&
                                                                                    <td>
                                                                                        {d.colorAmount.map((c, t) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <input
                                                                                                    key={t}
                                                                                                        type="number"
                                                                                                        name="code"
                                                                                                        min="0"
                                                                                                        onChange={(e) => {
                                                                                                            console.log("c amount before", c.amount);
                                                                                                            c.amount = parseInt(e.target.value);
                                                                                                            console.log("c amount after", c.amount);

                                                                                                        }}
                                                                                                        defaultValue={c.amount}
                                                                                                    />
                                                                                                    <>
                                                                                                        <input type="checkbox" style={{ marginRight: "70px" }} />
                                                                                                        <br></br>
                                                                                                    </>
                                                                                                </>
                                                                                            );
                                                                                        })}
                                                                                    </td>
                                                                                }
                                                                            </tr>                                                                            </>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    {
                                                        o.status == false &&
                                                        <Button variant="outline-success" className="mb-3" onClick={() => doneOrder(i)}>הזמנה הושלמה!</Button>
                                                    }
                                                    {
                                                        o.status == true &&
                                                        <>
                                                            <p>סה"כ מטפחות: {o.orderDetails.amountOfSnoods}</p>
                                                            <p>סה"כ לפני מע"מ: {o.orderDetails.priceBeforeTax} ש"ח</p>
                                                            <b>סה"כ אחרי מע"מ: {o.orderDetails.priceAfterTax} ש"ח</b>
                                                        </>
                                                    }
                                                </div>
                                            </Collapse>
                                        </div>
                                        <div className="card-footer text-muted">
                                            {formattedDate}
                                        </div>
                                    </div>
                                    <br></br>
                                </>
                            )
                        })
                    }</>
            }
        </>
    )
}