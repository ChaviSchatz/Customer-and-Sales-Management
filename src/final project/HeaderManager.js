import { useNavigate } from "react-router";
import { useRef } from 'react';

export function HeaderManager(prop) {
    return (
        <>
            <header dir="rtl">
                <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light" style={{borderBottom: "solid", borderBottomColor: "black"}}>
                    <div class="container-fluid" style = {{backgroundColor: ""}}>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav" style = {{marginTop: "20px"}}>
                                <li class="breadcrumb-item">
                                    <a class="nav-link active" href="/orders">הזמנות אחרונות</a>
                                </li>
                                 <li class="nav-item">
                                    <a class="nav-link active" href="/orders/dates">הזמנות לפי תאריכים</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/customers">ניהול לקוחות</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/edit-inventory">ניהול מלאי</a>
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
            </header>
        </>
    );
}