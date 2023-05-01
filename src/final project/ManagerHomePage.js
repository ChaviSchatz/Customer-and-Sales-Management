import { useNavigate } from "react-router-dom";


export function ManagerHomePage() {
    const navigate = useNavigate();

    return (
        <>
            <button type="button" class="btn btn-primary" onClick={() =>{
                    navigate(`/edit-inventory`);

            }}>לניהול מלאי</button>
            <br></br>
            <button type="button" class="btn btn-secondary" onClick={() =>{
                    navigate(`/orders`);

            }}>הזמנות</button>
            <br></br>
            <button type="button" class="btn btn-success">Success</button>
            <br></br>
            <button type="button" class="btn btn-danger">Danger</button>
            <br></br>
            <button type="button" class="btn btn-warning">Warning</button>
        </>
    )
}