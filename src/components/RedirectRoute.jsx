import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RedirectRoute({children})
{
    const {currentUser}=useAuth()
    if(currentUser)
    {
        return <Navigate to={'/blog'} replace />
    }
    return children
}