
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Update } from "./Update";
import { useNavigate } from "react-router-dom";
import { HeaderUser } from "./HeaderUser";
import { Footer } from "./Footer";

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
                    <div class="card-body">
                        <div class="container py-5 h-100">
                            <div class="row d-flex justify-content-center align-items-center h-100">
                                <div class="col">
                                    {/* <div class="card card-registration my-4"> */}
                                    {/* <div class="row g-0"> */}
                                    {/* <div class="col-xl-6 d-none d-xl-block"> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                    <h3 class="card-title">{details.name}</h3>
                                    <h5 class="card-text">{details.storeName}</h5></div>
                                <button type="button" class="btn btn-outline-dark" onClick={() => {
                                    setnavToUpdate(true);
                                }}>
                                    לעדכון פרטים
                                </button>
                                <br></br>
                                .                                         {/* </div> */}

                                {/* <div dir="rtl" style={{ "display": "flex" }}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>
                                <h3 class="card-title">{details.name}</h3>
                                <h5 class="card-text">{details.storeName}</h5></div>
                            <br></br>
                            <button type="button" class="btn btn-outline-dark" onClick={() => {
                                setnavToUpdate(true);
                            }}>
                                לעדכון פרטים
                            </button>
                        </div> */}
                                {
                                    navToUpdate == true &&
                                    <Update></Update>
                                }
                                {
                                    serverError == true &&
                                    <p>Uoooops we have problem now</p>
                                }

                                {/* </div> */}
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