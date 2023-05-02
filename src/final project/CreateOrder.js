import axios from "axios";
import { urlInventory, urlOrders } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { UpdateItem } from "./UpdateItem.js"
import { render } from "@testing-library/react";
// import { ChooseAColors } from "./ChooseAColors";
import { useSelector } from "react-redux";




export function CreateOrder() {


    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
    });

    const user = useSelector((state) => state.usersReducer);

    const inventory = useRef(null);
    const [r, setR] = useState(false);
    const [addItem, setItem] = useState(false);
    const [updateState, setUpdateState] = useState(false);

    const submit = async (order) => {
        console.log("order: ",order);
        debugger
        await axios.post(urlOrders, order)
            .then((response) => {
                if (response.status < 300) {
                    console.log("re.data", response.data);
                    // dispatch(pushNewUser(response.data));
                }
            })
            .catch((error) => console.log(error));
    }

    const itemsToOrder = useRef(
        {
            id: "",
            userId: String(user.id),
            status: false,
            orderDetails: {
                priceBeforeTax: 0.0,
                priceAfterTax: 0.0,
                amountOfSnoods: 0,
                date: new Date().toLocaleString(),
                details: []
            }
        });

    // console.log("1", updateState)

    const orderItem = (e, index, index2) => {


        //parse to int = parseInt(e.target.value)
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
                // console.log("current current",parseInt(e.target.value));
                itemsToOrder.current.orderDetails.details[i].colorAmount[indexColor].amount = parseInt(e.target.value);
            }
            else {
                itemsToOrder.current.orderDetails.details[i].colorAmount.push({ color: String(inventory.current[index].colors[index2]), amount: parseInt(e.target.value) })
            }
        }
        else {

            itemsToOrder.current.orderDetails.details.push({ code: String(inventory.current[index].code), description: String(inventory.current[index].description), price: parseInt(inventory.current[index].price), colorAmount: [{ color: String(inventory.current[index].colors[index2]), amount: parseInt(e.target.value) }] })
        }
    }



    const getInventory = async () => {
        debugger
        await axios.get(urlInventory + "/all")
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
            <html dir="rtl">
                {updateState == false &&
                    <>


                        {inventory.current != null &&
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">תאור</th>
                                        <th scope="col">קוד</th>
                                        <th scope="col">מחיר</th>
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
                                                                            <input id="form2Example1"// class="form-control"
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
            <button onClick={() => {
                console.log("itemsToOrder", itemsToOrder.current)
                // alert("??האם את/ה רןצה לסגור את ההזמנה");
                //axios.post of the use ref
                submit(itemsToOrder.current);

            }}>סגירת הזמנה</button>
            {/* {
                updateState == true &&
                <>
                    <ChooseAColors prop={updatingItem.current}></ChooseAColors>//למחוק את הקומפוננטה הזאת
                </>
            } */}
        </>

    )
}
