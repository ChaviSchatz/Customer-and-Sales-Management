import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { UpdateItem } from "./UpdateItem.js"
import { render } from "@testing-library/react";




export function ChooseAColors(prop) {
    console.log("prop:::", prop.prop);


    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
    });
    const choosecolors = useRef(prop.prop);
    const [r, setR] = useState(false);
    const [addItem, setItem] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    console.log("1", updateState)

    return (
        <>
            <html dir="rtl">

                {choosecolors.current != null &&
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                {/* <th scope="col">#</th> */}
                                <th scope="col">תאור</th>
                                <th scope="col">קוד</th>
                                <th scope="col">מחיר</th>
                                <th scope="col">צבעים</th>
                                <th scope="col">כמות</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{choosecolors.current.description}</td>
                                <td>{choosecolors.current.code}</td>
                                <td>{choosecolors.current.price}</td>

                                <td>

                                    <ol>
                                        {

                                            choosecolors.current.colors.map((color) => {
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
                                    <ol>
                                        {

                                            choosecolors.current.colors.map((amount) => {
                                                return (
                                                    <><li>
                                                        <input id="form2Example1"// class="form-control"
                                                            type="number"
                                                            name="amount"
                                                        // {...register('address.floor')}
                                                        defaultValue={0}
                                                        />
                                                    </li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ol>

                                </td>

                            </tr>
                        </tbody>
                    </table>
                }
                


            </html>
        </>

    )
}
