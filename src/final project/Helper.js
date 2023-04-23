import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
export  function Helper()
{
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/home-page`);
    }, []);

}