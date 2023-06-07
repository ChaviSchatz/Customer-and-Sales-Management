import axios from "axios";
import { useRef, useState } from "react";
import { urlUsers } from "./endpoints.ts";
import { urlOrders } from "./endpoints.ts";
import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';
import { HeaderManager } from "./HeaderManager.js";
import { getToken } from "./TockenService.js";

export function OrdersByDates() {
    const current = new Date();
    const [fromDate, setFromDate] = useState(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);
    const [toDate, setToDate] = useState(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);
    const orders = useRef([]);
    const peuple = useRef([]);
    const [r, setR] = useState(false);
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState();

    function handleClick(index) {
        if (open == false || index == openIndex) {
            setOpen(!open);

        }
        setOpenIndex(index);
        console.log("open", openIndex);
    }

    const getOrders = async () => {
        setR(false);
        await getOrdersAndPeople();
        setTimeout(() => {
            setR(true);
        }, 100);
    }
    const getOrdersAndPeople = async () => {
        debugger
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.get(urlOrders ,config,
            {
                params: {
                    from: fromDate,
                    to: toDate
                }
            })
            .then(response => {
                response.data = response.data.sort(function (a, b) {
                    return new Date(b.orderDetails.date) - new Date(a.orderDetails.date);
                });
                if (response.status < 299) {
                    response.data.forEach(async o => {
                        var config = {
                            headers: { Authorization: `Bearer ${getToken()}` }
                        };
                        const res = await axios.get(urlUsers + `/${o.userId}`,config)
                            .then(response => {
                                if (response.status < 299) {
                                    console.log(response.data);
                                    peuple.current.push(response.data);
                                }
                            })
                            .catch((error) => console.log(error));
                    });
                    console.log("response.data", response.data);
                    orders.current = response.data;
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <header>
                <HeaderManager></HeaderManager>
            </header>
            <html dir="rtl">
                <br></br>
                <h4 style={{background: "linear-gradient(110deg,#f2d7dd 60%, #cd8393 60%)"}}>הזמנות בטווח תאריכים:</h4>
                <br></br>
                <div style={{ display: "flex", width: "40%", margin: "auto", background: "linear-gradient(110deg,#f2d7dd 60%, #cd8393 60%)"}}>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">מתאריך: </span>
                        </div>
                        <input
                            type="date"
                            class="form-control"
                            aria-label="Default"
                            value={fromDate}
                            min="2017-01-01"
                            max="2030-01-01"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(e) => {
                                setFromDate(e.target.value)
                            }}
                        />
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">ועד תאריך: </span>
                        </div>
                        <input
                            type="date"
                            class="form-control"
                            aria-label="Default"
                            value={toDate}
                            min="2017-01-01"
                            max="2030-01-01"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(e) => {
                                setToDate(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <button type="button" class="btn btn-outline-dark"
                    onClick={getOrders}
                >קבל הזמנות בטווח זה</button>
                <br></br>
                <br></br>
                <br></br>
                {r != false &&
                    <>
                        {
                            orders.current.map((o, i) => {
                                console.log("o: ", o);
                                var date = new Date(o.orderDetails.date);
                                var year = date.getFullYear();
                                var dateVal = date.getDate();
                                var formattedDate = dateVal + '/' + (date.getMonth() + 1) + '/' + year;
                                return (
                                    <>
                                        <>
                                            <html dir="rtl">
                                                <div className="card">
                                                    <div className="card-header">
                                                        {
                                                            o.status == true &&
                                                            <p>הזמנה הושלמה
                                                                <svg xmlns="http://www.w3.org/2000/svg" style={{"marginRight" : "10px"}} width="23" height="23" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                                </svg>
                                                            </p>
                                                        }
                                                        {peuple.current[i].storeName}
                                                    </div>
                                                    <div className="card-body">
                                                        <Button variant="Light" style={{border: "2px solid #95532f", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
                                                         className="mb-4" onClick={() => handleClick(i)}>
                                                            פרטי הזמנה
                                                        </Button>
                                                        <Collapse key={i} in={open && openIndex == i}>
                                                            <div id="collapsePanel">
                                                                <table class="table table-striped">
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
                                                                                        <tr>
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
                                                                                                                    <div style={{ display: "flex" }}>
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
                                                                                                    {d.colorAmount.map((c) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <input
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
                                                    <div class="card-footer text-muted">
                                                        {formattedDate}
                                                    </div>
                                                </div>
                                            </html>
                                            <br></br> </>
                                    </>
                                )
                            })
                        }</>}
            </html>
        </>
    )
}