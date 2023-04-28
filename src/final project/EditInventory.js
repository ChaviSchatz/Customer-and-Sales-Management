import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {UpdateItem } from "./UpdateItem.js"

export function EditInventory() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
    });

    const inventory = useRef(null);
    const [r, setR] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    console.log("1",updateState)
    const updatingItem = useRef(null);

    const getInventory = async () => {
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

    // const onSubmit = async (data) => {
    //     debugger
    //     const arr = [... new Set(indexes.current)]
    //     console.log(arr);
    //     for(const i of arr){
    //         const res = await axios.put(urlInventory, inventory.current[i])
    //     .then(response => {
    //         if (response.status < 299) {
    //             console.log(response.data);
    //         }
    //     })
    //     .catch((error) => console.log(error));
    // }

    // }

    // const goToUpdate = (index) => {
    //     // setUpdateState(true);
    // }

    return (
        <>
        <html dir="rtl">
            {updateState == false &&
            <>
            <p>עדכון מלאי</p>
            <button>הוספת מוצר</button>
            
            {inventory.current != null &&
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
                        {inventory.current.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.description}</td>
                                        <td>{item.code}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {/* <div style={{textAlign: "center"}}> */}
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
                                            {/* </div> */}
                                        </td>
                                        <td>
                                            <button class="btn btn-primary" onClick={() =>{
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
        {/* } */}
        </>
        }
        </html>
    
        {
            updateState == true &&
            <>
            <p>jjjjjj</p>
            <UpdateItem prop = {updatingItem.current}></UpdateItem>
            <button onClick={() => {
                setUpdateState(false);
            }}>חזור לרשימת מוצרים</button>
            </>
        }
        </>
    )
}