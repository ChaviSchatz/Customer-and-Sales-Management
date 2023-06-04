import { useNavigate } from "react-router";
import { useRef } from 'react';
import img1 from './images/smallLogo.jpg';

export function HeaderManager(prop) {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "solid", borderBottomColor: "black" }}>
                    <div class="container-fluid" style={{ backgroundColor: "" }}>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav" style={{ marginTop: "20px" }}>
                                <li class="breadcrumb-item">
                                    <a class="nav-link active" onClick={() => navigate("/orders")}>הזמנות אחרונות</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" onClick={() => navigate("/orders/dates")}>הזמנות לפי תאריכים</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" onClick={() => navigate("/customers")}>ניהול לקוחות</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" onClick={() => navigate("/edit-inventory")}>ניהול מלאי</a>
                                </li>
                            </ul>
                        </div>

                        <div class="d-flex align-items-center">
                            {/* <a class="nav-link active" onClick={() => {navigate('/cart')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16" style = {{margin: "15px"}}>
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                </svg>
                            </a> */}
                        </div>
                    </div>
                </nav>

                <nav dir="rtl" class="navbar navbar-expand-lg navbar-light bg-light" style={{ "borderBottom": "solid #9A616D" }}>
                    <div class="container-fluid justify-content-between">
                        <div class="d-flex">
                            <img src={img1} alt="" width="20%" style={{ "marginLeft": "30%" }} />

                            <ul class="navbar-nav flex-row d-none d-md-flex">
                                <ul class="nav justify-content-center">
                                    <li class="nav-item">
                                        <a class="nav-link active" onClick={() => navigate("/costumers")}>                                   
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                            </svg><br></br>ניהול לקוחות</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" onClick={() => navigate("/orders")}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                        </svg><br></br>הזמנות אחרונות </a>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <ul class="navbar-nav flex-row">
                            <li class="nav-item me-3 me-lg-1">
                                <p >
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ "margin": "10px", "color": "#9A616D" }} width="26" height="26" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>ליצירת קשר: 050-389-7255</p>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}
