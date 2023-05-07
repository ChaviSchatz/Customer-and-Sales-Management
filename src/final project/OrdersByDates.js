import axios from "axios";
import { useState } from "react";
import { urlOrders } from "./endpoints.ts";


export function OrdersByDates() {
    const current = new Date();
    const [fromDate, setFromDate] = useState(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);
    const [toDate, setToDate] = useState(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);

    const getOrders = async () =>{
        const res = await axios.get(urlOrders + "/search", 
        { params: { from: fromDate,
        to: toDate } }).then(response => console.log(response.data))
        .catch(err => console.log(err));

    }

    return (
        <>
        <html dir="rtl">
            <h4>הזמנות בטווח תאריכים:</h4>
            <br></br>
            <div style={{display : "flex", width: "40%", margin: "auto"}}>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">מתאריך: </span>
                </div>
                <input  
                    type="date"
                    class="form-control"
                    aria-label="Default"
                    value={fromDate}
                    min="2017-01-01" 
                    max="2030-01-01"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => {
                        setFromDate(e.target.value)
                    }}
                     />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">ועד תאריך: </span>
                </div>
                <input  
                    type="date"
                    class="form-control"
                    aria-label="Default"
                    value={toDate}
                    min="2017-01-01" 
                    max="2030-01-01"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => {
                        setToDate(e.target.value)
                    }}
                     />
            </div>
            </div>
            <button type="button" class="btn btn-outline-dark"
            onClick={getOrders}
            >קבל הזמנות בטווח זה</button>
            
            </html>
        </>
    )
}