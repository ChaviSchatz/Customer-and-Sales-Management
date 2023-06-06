import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getToken } from "./TockenService.js";

export function UpdateItem(prop) {
    const navigate = useNavigate();
    const [forRendering, setForRendering] = useState(1);
    const item = useRef(prop.prop);

    return (
        <>
        <br></br>
            <html dir="rtl" style={{"width" : "60%", margin: "auto"}}>
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
                                        class="form-control"
                                        type="text"
                                        name="description"
                                        onChange={(e) => {
                                            item.current.description = e.target.value;
                                        }}
                                        defaultValue={item.current.description}
                                    /></td>
                                    <td><input
                                        class="form-control"
                                        type="text"
                                        name="code"
                                        onChange={(e) => {
                                            item.current.code = e.target.value;
                                        }}
                                        defaultValue={item.current.code}
                                    /></td>
                                    <td><input
                                        class="form-control"
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
                                                                    <div class="input-group mb-3">
                                                                        <input class="form-control"
                                                                            type="text"
                                                                            name="color"
                                                                            aria-label="" aria-describedby="basic-addon1"
                                                                            onChange={(e) => {
                                                                                item.current.colors[i] = e.target.value;
                                                                            }}
                                                                            defaultValue={color}
                                                                        />
                                                                        <div class="input-group-prepend">
                                                                            <button class="btn btn-outline-danger" type="button" onClick={async () => {
                                                                                delete item.current.colors[i];
                                                                                setForRendering(forRendering + 1);
                                                                            }}>למחיקה</button></div></div>
                                                                </li>
                                                                <br></br>

                                                            </div>
                                                        </>
                                                    );
                                                })}
                                                <button class="btn btn-outline-dark" onClick={() => {
                                                    item.current.colors.push("");
                                                    setForRendering(forRendering + 1);
                                                }}>הוסף צבע</button>
                                            </>
                                        </ol>
                                    </td>
                                </tr>
                            </>
                        </tbody>
                    </table>

                }
                <button class="btn btn btn-outline-dark btn-lg btn-block" style={{ background: "linear-gradient(100deg,#cd8393 40%,#f2d7dd 60%)" }}
                    onClick={async () => {
                        item.current.colors = await item.current.colors.filter(c => c != undefined);
                        var config = {
                            headers: { Authorization: `Bearer ${getToken()}` }
                        };
                        debugger
                        const res = await axios.put(urlInventory, item.current, config)
                            .then(response => {
                                if (response.status < 299) {
                                    console.log(response.data);
                                }
                                navigate(`/helper/edit-inventory`);
                            })
                            .catch((error) => console.log(error));
                    }}>שמירה</button>

            </html>
        </>
    )
}