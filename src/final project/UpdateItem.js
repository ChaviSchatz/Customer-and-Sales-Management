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
                                    <ol>
                                        <>{
                                            item.current.colors.map((color, i) => {
                                                console.log("color: ", color);
                                                return (
                                                    <>
                                                        <div>
                                                        
                                                            <li>
                                                            <input
                                                                type="text"
                                                                name="color"
                                                                onChange={(e) => {
                                                                    item.current.colors[i] = e.target.value;
                                                                }}
                                                                defaultValue={color}
                                                            />
                                                            <button onClick = { async () => {
                                                                delete item.current.colors[i];
                                                                setForRendering(forRendering + 1);
                                                            }}>למחיקה</button>
                                                            </li>
                                                            <br></br>
                                                           
                                                        </div>
                                                    </>
                                                );
                                            })}
                                            <button onClick={() => {
                                                item.current.colors.push("");
                                                setForRendering(forRendering + 1);
                                            }}>add new color</button>
                                        </>
                                        </ol>
                                    </td>
                                </tr>
                            </>
                        </tbody>
                    </table>

                }
                <button onClick={async () => {
                    item.current.colors = await item.current.colors.filter(c => c != undefined);
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