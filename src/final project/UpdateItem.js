import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export function UpdateItem(prop) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
    });
    const inventory = useRef(prop.prop);
    console.log(prop);

    const inputHtml =  "<input type='text' name='color' placeholder= 'new color'/>";


    // const inventory = useRef(null);
    // const indexes = useRef([]);
    const [r, setR] = useState(false);

    // const getInventory = async () => {
    //     await axios.get(urlInventory + "/all")
    //         .then(response => {
    //             if (response.status < 299) {
    //                 console.log(response.data);
    //                 inventory.current = response.data;
    //                 setR(true);
    //             }
    //         })
    //         .catch((error) => console.log(error));
    // }
    // useEffect(() => {
    //     getInventory();
    // }, []);

    const onSubmit = async (data) => {
        debugger
        // const arr = [... new Set(indexes.current)]
        // console.log(arr);
        // for (const i of arr) {
        const res = await axios.put(urlInventory, inventory.current)
            .then(response => {
                if (response.status < 299) {
                    console.log(response.data);
                }
            })
            .catch((error) => console.log(error));
        // }

    }


    return (
        <>
            <html dir="rtl">
                <p>עדכון מלאי</p>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    {inventory.current != null &&
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">תאור</th>
                                    <th scope="col">קוד</th>
                                    <th scope="col">מחיר</th>
                                    <th scope="col">צבעים</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {inventory.current.map((item, index) => {
                                    {
                                        return ( */}
                                <>
                                    <tr>
                                        {/* <th scope="row">{inventory.current.description}</th> */}
                                        <td><input
                                            type="text"
                                            name="description"
                                            onChange={(e) => {
                                                // indexes.current.push(index);
                                                inventory.current.description = e.target.value;
                                            }}
                                            // {...register('description')}
                                            defaultValue={inventory.current.description}
                                        /></td>
                                        <td><input
                                            type="text"
                                            name="code"
                                            onChange={(e) => {
                                                // indexes.current.push(index);
                                                inventory.current.code = e.target.value;
                                            }}
                                            // {...register('code')}
                                            defaultValue={inventory.current.code}
                                        /></td>
                                        <td><input
                                            type="number"
                                            name="price"
                                            onChange={(e) => {
                                                // indexes.current.push(index);
                                                inventory.current.price = e.target.value;
                                            }}
                                            // {...register('price')}
                                            defaultValue={inventory.current.price}
                                        /></td>
                                        <td>
                                            <>{
                                                inventory.current.colors.map((color, i) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                <label>{i + 1}.</label>
                                                                <input
                                                                    type="text"
                                                                    name="color"
                                                                    onChange={(e) => {
                                                                        // indexes.current.push(index);
                                                                        inventory.current.colors[i] = e.target.value;
                                                                    }}
                                                                    // {...register('color')} 
                                                                    defaultValue={color}
                                                                /><br></br>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                <button onClick={p => p.add.insertAdjacentHTML("beforeend", inputHtml)}>add new color</button>
                                            </>

                                        </td>
                                    </tr>
                                </>
                                {/* )
                                    }} */}
                                {/* )} */}
                            </tbody>
                        </table>

                    }
                    <button type="onSubmit" onClick={onSubmit()}>שמירה</button>
                {/* </form> */}
            </html>
        </>
    )
}