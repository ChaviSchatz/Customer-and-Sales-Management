import axios from "axios";
import { urlInventory, urlOrders } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { HeaderUser } from "./HeaderUser";
import { getToken } from "./TockenService.js";
import { Footer } from "./Footer";




export function CreateOrder() {
    const user = useSelector((state) => state.usersReducer);
    const [isEmptyOrder, setIsEmptyOrder] = useState(false);
    const inventory = useRef(null);
    const [r, setR] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const navigate = useNavigate();

    const submit = async (order) => {
        setIsEmptyOrder(false);
        console.log("order: ", order.orderDetails.details);
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        if (order.orderDetails.details.length == 0) {
            setIsEmptyOrder(true);
        }
        else {
            await axios.post(urlOrders, order, config)
                .then((response) => {
                    if (response.status < 300) {
                        console.log("re.data", response.data);

                        setUpdateState(true);

                        setTimeout(() => {
                            navigate("/users-orders");
                        }, 2000)
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    const itemsToOrder = useRef(
        {
            id: "",
            userId: user.id,
            status: false,
            orderDetails: {
                priceBeforeTax: 0.0,
                priceAfterTax: 0.0,
                amountOfSnoods: 0,
                date: new Date(),
                details: []
            }
        });


    const orderItem = (e, index, index2) => {


        console.log("current", parseInt(e.target.value))
        debugger
        var b = false;
        var i = -1;
        for (var t = 0; t < itemsToOrder.current.orderDetails.details.length; t++) {
            var x = itemsToOrder.current.orderDetails.details;
            if (x[t].code == inventory.current[index].code) {
                b = true;
                i = t;
            }

        }
        if (b == true) {
            var co = false;
            var indexColor = -1;
            for (var t = 0; t < itemsToOrder.current.orderDetails.details[i].colorAmount.length; t++) {
                var x = itemsToOrder.current.orderDetails.details[i].colorAmount;
                if (x[t].color == inventory.current[index].colors[index2]) {
                    co = true;
                    indexColor = t;
                }

            }
            if (co == true) {
                itemsToOrder.current.orderDetails.details[i].colorAmount[indexColor].amount = parseInt(e.target.value);
            }
            else {
                if (parseInt(e.target.value != 0)) {
                    itemsToOrder.current.orderDetails.details[i].colorAmount.push({ color: inventory.current[index].colors[index2], amount: parseInt(e.target.value) })
                }
            }
        }
        else {
            if (parseInt(e.target.value != 0)) {
            itemsToOrder.current.orderDetails.details.push({ code: inventory.current[index].code, description: inventory.current[index].description, price: parseInt(inventory.current[index].price), colorAmount: [{ color: inventory.current[index].colors[index2], amount: parseInt(e.target.value) }] })
        }}
    }



    const getInventory = async () => {
        debugger
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.get(urlInventory, config)
            .then(response => {
                if (response.status < 299) {
                    console.log(response.data);
                    inventory.current = response.data;
                    setR(true);
                }
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        getInventory();
    }, []);

    return (
        <>
            <header className="App-header">
                <HeaderUser></HeaderUser>
            </header>
            <html dir="rtl">
                {updateState == false &&
                    <>
                        {inventory.current != null &&
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">תאור</th>
                                        <th scope="col">קוד</th>
                                        <th scope="col">מחיר לפני מע"מ</th>
                                        <th scope="col">צבעים</th>
                                        <th scope="col">כמות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory.current.map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.description}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.price}</td>
                                                    <td>

                                                        <ol>
                                                            {

                                                                item.colors.map((color) => {
                                                                    return (
                                                                        <>
                                                                            <div style={{ textAlign: "right", marginRight: "130px" }}>
                                                                                <li>{color}</li>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </ol>

                                                    </td>
                                                    <td>
                                                        <ol>
                                                            {

                                                                item.colors.map((c, i) => {
                                                                    return (
                                                                        <><li>
                                                                            <input
                                                                                type="number"
                                                                                name="amount"
                                                                                defaultValue={0}
                                                                                min="0"
                                                                                onChange={(e) => orderItem(e, index, i)}
                                                                            />
                                                                        </li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </ol>

                                                    </td>

                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </>

                }

            </html>
            <button className="btn btn-outline-dark" onClick={() => {
                console.log("itemsToOrder", itemsToOrder.current)
                submit(itemsToOrder.current);

            }}>סגירת הזמנה</button>
            <br></br>
            {
                isEmptyOrder == true &&
                <p>Please choose items...</p>
            }
            {
                updateState == true &&
                <div style={{ margin: "auto", textAlign: "center" }}>
                    <h4>
                        Your order has been sent.
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16" style={{ margin: "20px" }}>
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="pink" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                    </h4>
                </div>
            }
            <Footer></Footer>
        </>

    )
}

