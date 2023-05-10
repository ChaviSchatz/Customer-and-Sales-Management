import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { urlUsers } from "./endpoints.ts";
import { urlOrders } from "./endpoints.ts";
import "./cssFiles/orders.css";
import { Button, Collapse } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeaderUser } from "./HeaderUser";

export function UserOrders() {
    const user = useSelector((state) => state.usersReducer);
    const [details, setdetails] = useState(user);
    const orders = useRef(null);
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
        console.log("DD", details.id);
        await axios.get(urlOrders + `/${details.id}`)
            .then(response => {
                if (response.status < 299) {
                    orders.current = response.data.sort(function (a, b) {
                        return new Date(b.orderDetails.date) - new Date(a.orderDetails.date);
                    });
                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        async function fetchData() {
            await getOrders();
            setTimeout(() => {
                setR(true);
            }, 100);
        }
        fetchData();
    }, []);

    return (
        <>
            <header className="App-header">
                <HeaderUser></HeaderUser>
            </header>
            <br></br>
            <button type="button" class="btn btn-outline-success btn-lg" style={{position: "fixed", right: "80px"}} onClick={() => {
                navigate("/create-order");
            }}>הזמנה חדשה</button>
            <br></br>
            <br></br>
            <h4>הזמנות אחרונות</h4>
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
                                    <html dir="rtl">
                                        <div className="card" style={{width: "60%", margin: "auto"}}>
                                            <div className="card-header">
                                                {
                                                    o.status == false &&
                                                    <p>הזמנה ממתינה
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-x" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z" />
                                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                        </svg>
                                                    </p>

                                                }
                                                {
                                                    o.status == true &&
                                                    <p>הזמנה הושלמה
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                        </svg>
                                                    </p>
                                                }
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
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">תאור</th>
                                                                    <th scope="col">קוד</th>
                                                                    <th scope="col">מחיר</th>
                                                                    <th scope="col">צבעים</th>
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
                                    <br></br>
                                </>
                            )
                        })
                    }</>
            }
        </>
    )
}