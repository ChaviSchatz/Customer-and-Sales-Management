import './cssFiles/headerUser.css';
import { useNavigate } from "react-router";
import { useRef } from 'react';
import img1 from './images/smallLogo.jpg';

export function HeaderUser() {
    const navigate = useNavigate();
    return (
        <>
            <header dir="rtl" className='header'>
                {/* <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light"> */}
                <nav class="navbar navbar-light" dir="rtl" style={{ 'borderBottom': '2px solid #9A616D', "marginBottom": "80px", "marginTop": "15px" }}>

                    {/* <img src={img1} alt="" width="10%" />
                    <a class="navbar-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ "margin": "10px", "color": "#9A616D" }} width="26" height="26" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>ליצירת קשר: 050-389-7255</a> */}
                    {/* </nav> */}

                    <div class="container-fluid">
                        <ul class="navbar-nav mb-2 mb-lg-0" style={{ marginTop: "20px" }}>
                            <li class="nav-item">
                                <a class="nav-link active" onClick={() => navigate('/home-page')}>החשבון שלי</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" onClick={() => navigate("/users-orders")}>הזמנות</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- Navbar--> */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid justify-content-between">
                        {/* <!-- Left elements --> */}
                        <div class="d-flex">
                        <img src={img1} alt="" width="10%" />
                    <a class="navbar-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ "margin": "10px", "color": "#9A616D" }} width="26" height="26" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>ליצירת קשר: 050-389-7255</a>
                            {/* <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                    height="20"
                                    alt="MDB Logo"
                                    loading="lazy"
                                    style="margin-top: 2px;"
                                />
                            </a> */}

                            {/* <!-- Search form --> */}
                            {/* <form class="input-group w-auto my-auto d-none d-sm-flex">
                                <input
                                    autocomplete="off"
                                    type="search"
                                    class="form-control rounded"
                                    placeholder="Search"
                                    style="min-width: 125px;"
                                />
                                <span class="input-group-text border-0 d-none d-lg-flex"
                                ><i class="fas fa-search"></i
                                ></span>
                            </form> */}
                        </div>
                        {/* <!-- Left elements --> */}

                        {/* <!-- Center elements --> */}
                        <ul class="navbar-nav flex-row d-none d-md-flex">
                        <ul class="navbar-nav mb-2 mb-lg-0" style={{ marginTop: "20px" }}>
                            <li class="nav-item">
                                <a class="nav-link active" onClick={() => navigate('/home-page')}>החשבון שלי</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" onClick={() => navigate("/users-orders")}>הזמנות</a>
                            </li>
                        </ul>
                        </ul>
                        {/* <!-- Center elements --> */}

                        {/* <!-- Right elements --> */}
                        <ul class="navbar-nav flex-row">
                            <li class="nav-item me-3 me-lg-1">
                                <a class="nav-link d-sm-flex align-items-sm-center" href="#">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                                        class="rounded-circle"
                                        height="22"
                                        alt="Black and White Portrait of a Man"
                                        loading="lazy"
                                    />
                                    <strong class="d-none d-sm-block ms-1">John</strong>
                                </a>
                            </li>
                            <li class="nav-item me-3 me-lg-1">
                                <a class="nav-link" href="#">
                                    <span><i class="fas fa-plus-circle fa-lg"></i></span>
                                </a>
                            </li>
                            <li class="nav-item dropdown me-3 me-lg-1">
                                <a
                                    class="nav-link dropdown-toggle hidden-arrow"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="fas fa-comments fa-lg"></i>

                                    <span class="badge rounded-pill badge-notification bg-danger">6</span>
                                </a>
                                <ul
                                    class="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <li>
                                        <a class="dropdown-item" href="#">Some news</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Another news</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown me-3 me-lg-1">
                                <a
                                    class="nav-link dropdown-toggle hidden-arrow"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="fas fa-bell fa-lg"></i>
                                    <span class="badge rounded-pill badge-notification bg-danger">12</span>
                                </a>
                                <ul
                                    class="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <li>
                                        <a class="dropdown-item" href="#">Some news</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Another news</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown me-3 me-lg-1">
                                <a
                                    class="nav-link dropdown-toggle hidden-arrow"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="fas fa-chevron-circle-down fa-lg"></i>
                                </a>
                                <ul
                                    class="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <li>
                                        <a class="dropdown-item" href="#">Some news</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Another news</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {/* <!-- Right elements --> */}
                    </div>
                </nav>
                {/* <!-- Navbar --> */}
            </header>
        </>
    );
}
