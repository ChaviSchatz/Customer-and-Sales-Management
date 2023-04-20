import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export  function Helper()
{
    const { index } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/home/${index}`);

    }, []);

}