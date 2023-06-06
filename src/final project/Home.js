
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Update } from "./Update";
import { useNavigate } from "react-router-dom";
import { HeaderUser } from "./HeaderUser";
import { Footer } from "./Footer";
import './cssFiles/home.css';

export function Home() {
    const user = useSelector((state) => state.usersReducer);
    const [details, setdetails] = useState(null);
    const [serverError, setserverError] = useState(false);
    const [navToUpdate, setnavToUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        debugger
        console.log("hhh", user);
        setdetails(user);
    }, []);

    return (
        <>
            <header className="App-header">
                <HeaderUser></HeaderUser>
            </header>

            {
                details != null &&
                <>
                    <div class="card" style={{ margin: "120px" }}>
                        <div class="row" style={{ "textAlign": "center", border: "2px solid black", borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                            <div class="col-6" id="backColorForm" style={{ "textAlign": "center" }}>
                                {
                                    navToUpdate == false &&
                                    <>
                                        <button type="button" 
                                        style={{marginTop: "80px", border: "3px solid #ad674196", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
                                        class="btn btn-light btn-lg" 
                                        onClick={() => {
                                            setnavToUpdate(true);
                                        }}>
                                            לעדכון פרטים
                                        </button>
                                    </>
                                }
                                {
                                    navToUpdate == true &&
                                    <Update></Update>
                                }
                                {
                                    serverError == true &&
                                    <p>Uoooops we have problem now</p>
                                }
                            </div>
                            <div class="col-6" id="backColor" style={{ "textAlign": "center" }}>
                                <div class="card-body" style={{ margin: "20px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                    <h3 class="card-title">{details.name}</h3>
                                    <i><h5 class="card-text">{details.storeName}</h5></i>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    {/* <button type="button" class="btn btn-outline-dark btn-lg" onClick={() => {
                                        setnavToUpdate(true);
                                    }}>
                                        לעדכון פרטים
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <footer style={{ "marginTop": "25%" }}>
                <Footer></Footer>
            </footer>
        </>
    );
}