import './cssFiles/headerUser.css';
import { useNavigate } from "react-router";
import { useRef } from 'react';
import img1 from './images/smallLogo.jpg';

export function HeaderUser() {
    const navigate = useNavigate();
    return (
        <>
            <nav dir="rtl" className="navbar navbar-expand-lg navbar-light bg-light" style={{"borderBottom" : "solid #9A616D"}}>
                <div className="container-fluid justify-content-between">
                    <div className="d-flex">
                        <img src={img1} alt="" width="20%" style={{ "marginLeft": "30%" }} />

                        <ul className="navbar-nav flex-row d-none d-md-flex">
                            <ul className="nav justify-content-center">
                                <li className="nav-item">
                                    <a className="nav-link active" onClick={() => navigate('/home-page')}>                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg><br></br>החשבון שלי</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" onClick={() => navigate("/users-orders")}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                    </svg><br></br>הזמנות </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3 me-lg-1">
                            <p >
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ "margin": "10px", "color": "#9A616D" }} width="26" height="26" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>ליצירת קשר: 050-389-7255</p>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
