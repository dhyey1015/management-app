import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";

export function Success() {
    const navigate = useNavigate();
    const { logout } = useAuth()
    function logoutUser() {
        logout()
        navigate("/login");
    }

    return (
        <div>
            <h2>Success!</h2>
            <p>You are logged in.</p>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={logoutUser}
            >
                Logout
            </button>
        </div>
    );
}
