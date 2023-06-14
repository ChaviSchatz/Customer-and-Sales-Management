import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateItem } from "./UpdateItem.js"
import { HeaderManager } from "./HeaderManager.js";
import { getToken } from "./TockenService.js";

export function EditInventory() {
    const inventory = useRef(null);
    const [r, setR] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const updatingItem = useRef(null);

    const getInventory = async () => {
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        debugger
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
            <header>
                <HeaderManager></HeaderManager>
            </header>
            <html dir="rtl">
                {updateState == false &&
                    <>
                        <br></br>
                        <button class="btn btn btn-outline-dark btn-lg btn-block" style={{width: "40%", margin: "auto", background: "linear-gradient(100deg,#cd8393 40%,#f2d7dd 60%)"}}
                        onClick={() => {
                            updatingItem.current = {
                                code: "",
                                description: "",
                                id: "",
                                price: 0,
                                colors: []
                            }
                            setUpdateState(true);
                        }}>להוספת מוצר</button>
                        <br></br>
                        {inventory.current != null &&
                            <table class="table table-striped">
                                <thead>
                                    <tr style={{borderBottom: "3px solid #cd8393"}}>
                                        <th scope="col">#</th>
                                        <th scope="col">תאור</th>
                                        <th scope="col">קוד</th>
                                        <th scope="col">מחיר</th>
                                        <th scope="col">צבעים</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory.current.map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row" style={{borderLeft: "#f8b89562"}}>{index + 1}</th>
                                                    <td>{item.description}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.price}</td>
                                                    <td>

                                                        <ol>
                                                            {

                                                                item.colors.map((color, i) => {
                                                                    return (
                                                                        <>
                                                                            <li>{color}</li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </ol>

                                                    </td>
                                                    <td>
                                                        <button class="btn btn-outline-dark" onClick={() => {
                                                            updatingItem.current = inventory.current[index];
                                                            setUpdateState(true);
                                                        }}>לעדכון פריט</button>
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

            {
                updateState == true &&
                <>
                    <UpdateItem prop={updatingItem.current}></UpdateItem>
                </>
            }
        </>
    )
}