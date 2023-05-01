import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { urlUsers } from "./endpoints.ts";
import { urlOrders } from "./endpoints.ts";


export function Orders() {
    const orders = useRef(null);
    const peuple = useRef(null);
    const dict = useRef(null);
    const [r, setR] = useState(false);
    const [per, setper] = useState();

    const getOrders = async () => {
        await axios.get(urlOrders)
            .then(response => {
                if (response.status < 299) {
                    console.log("orders",response.data);
                    var g = [];
                    response.data.forEach(async o => {
                        const res = await axios.get(urlUsers + `/${o.userId}`)
                        .then(response => {
                            if (response.status < 299) {
                                console.log(response.data);
                                // peuple.current.push(response.data);
                                g.push(response.data);
                            }
                        })
                        .catch((error) => console.log(error));
                        console.log("res: ", res);
                    });

                    orders.current = response.data;
                    peuple.current = g;
                    console.log("ggg",peuple.current);
                    console.log("orders.current: ",orders.current);

                }
            })
            .catch((error) => console.log(error));
            return peuple.current;
    }

    useEffect( () =>  {
        // debugger
        async function fetchData() {
            // You can await here
            dict.current = await getOrders();

            setTimeout(() => {
                setR(true);
            }, 100);
            // ...
          }
          fetchData();
        
        //  console.log("ggg",peuple.current);

        console.log("dict: ", dict.current);
    }, []);

    return (
        // <></>
        <>
        { r != false  &&
            <>
            {
                orders.current.map((o, i) => {
                    console.log("sss",peuple.current[0]);
                    return (
                        <>
                            <div className="card">
                                <div className="card-header">
                                   {peuple.current[i].storeName}
                                </div>
                                <div className="card-body">
                                    {/* <h5 className="card-title">Special title treatment</h5> */}
                                    <p className="card-text">תאריך: {peuple.current[i].date}</p>
                                    <button href="#" className="btn btn-primary">פרטי הזמנה:</button>
                                </div>
                            </div>
                        </>
                    )
                })
            }</>
            }
        </>
    )
}