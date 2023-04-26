import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.array().of(
    yup.object().shape({
        id: yup.string(),
        code: yup.string().required(),
        inStock: yup.bool(),
        description : yup.string().required(),
        price: yup.number().required(),
        colors : yup.array().of(yup.string())
    })
)


    
export function EditInventory() {
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const [inventory, setInventory] = useState(null);

    const getInventory = async () => {
        await axios.get(urlInventory + "/all")
            .then(response => {
                if (response.status < 299) {
                    console.log(response.data);
                    setInventory(response.data);
                }
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        getInventory();
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <html dir="rtl">
            <p>עדכון מלאי</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            {inventory != null &&
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
                        {inventory.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><input 
                                        type="text"
                                        name="description"
                                        {...register('description')}
                                        defaultValue={item.description}
                                        /></td>
                                        <td><input
                                        type="text"
                                        name="code"
                                        {...register('code')}
                                         defaultValue={item.code}
                                         /></td>
                                        <td><input
                                        type="number"
                                        name="price"
                                        {...register('price')}
                                         defaultValue={item.price}
                                         /></td>
                                        <td>
                                            {
                                                item.colors.map((color, index)=> {
                                                    return(
                                                        <>
                                                        <div>
                                                        <label>{index+1}.</label>
                                                        <input
                                                        // type="text"
                                                        // name="color"
                                                        // {...register('color')} 
                                                        defaultValue={color}
                                                         /><br></br>
                                                         </div>
                                                         </>
                                                    )
                                                })
                                            }

                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
               
            }
             <button>שמירה</button>
        </form>
        </html>
    )
}