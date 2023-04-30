import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";

export function UpdateItem(prop) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [forRendering, setForRendering] = useState(1);
    const item = useRef(prop.prop);

    return (
        <>
            <html dir="rtl">
                <p>עדכון מלאי</p>
                {item.current != null &&
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">תאור</th>
                                <th scope="col">קוד</th>
                                <th scope="col">מחיר</th>
                                <th scope="col">צבעים</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                <tr>
                                    <td><input
                                        type="text"
                                        name="description"
                                        onChange={(e) => {
                                            item.current.description = e.target.value;
                                        }}
                                        defaultValue={item.current.description}
                                    /></td>
                                    <td><input
                                        type="text"
                                        name="code"
                                        onChange={(e) => {
                                            item.current.code = e.target.value;
                                        }}
                                        defaultValue={item.current.code}
                                    /></td>
                                    <td><input
                                        type="number"
                                        name="price"
                                        onChange={(e) => {
                                            item.current.price = e.target.value;
                                        }}
                                        defaultValue={item.current.price}
                                    /></td>
                                    <td>
                                        <>{
                                            item.current.colors.map((color, i) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <label>{i + 1}.</label>
                                                            <input
                                                                type="text"
                                                                name="color"
                                                                onChange={(e) => {
                                                                    item.current.colors[i] = e.target.value;
                                                                }}
                                                                defaultValue={color}
                                                            />
                                                            <button onClick={() =>{
                                                                item.current.colors.splice(i, 1);
                                                                item.current.colors.filter(c => c!= item.current.colors[i]);
                                                                console.log("item.current.colors", item.current.colors);
                                                                setForRendering(forRendering + 1);
                                                            }}>למחיקה</button>
                                                        <br></br>
                                                    </div>
                                                    </>
                                        )
                                            })}
                                        <button onClick={() => {
                                            item.current.colors.push("");
                                            setForRendering(forRendering + 1);
                                        }}>add new color</button>
                                    </>
                                </td>
                            </tr>
                        </>
                    </tbody>
                    </table>

                }
            <button onClick={async () => {
                const res = await axios.put(urlInventory, item.current)
                    .then(response => {
                        if (response.status < 299) {
                            console.log(response.data);
                        }
                    })
                    .catch((error) => console.log(error));
                navigate(`/helper/edit-inventory`);
            }}>שמירה</button>

        </html>
        </>
    )
}