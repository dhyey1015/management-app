import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contextApi/AuthContext";


export function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        email: "",
        firstName: "",
        LastName: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
    const { login } = useAuth();

    async function register() {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
                email: registerData.email,
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                password: registerData.password
            });

            if (response.data.token) {
                login({ token: response.data.token });
                navigate("/success");
            }
        } catch (error) {
            if (error.response) {
                setMessage("Something went wrong. Try again or user already exists with this email.");
                setMessageType("error");
            } else {
                setMessage("Network error. Check your connection.");
                setMessageType("error");
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100">
            <div className="flex flex-col w-full max-w-[800px] min-h-screen justify-center items-center">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-[700px] w-full flex flex-col justify-center items-center space-y-4">
                    <div className="flex flex-col items-center text-center p-2 max-w-[700px] w-full">
                        <div className="text-2xl font-bold mb-2">Join Us</div>
                        <div className="text-lg">Create your account and get started</div>
                    </div>
                    <hr className="w-full border-t border-gray-300" />
                    
                    {message && (
                        <div
                            className={`w-full text-center text-sm px-4 py-2 rounded-md ${
                                messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="p-4 mb-4">
                        <InputBox 
                            type="email" 
                            placeholder="Enter your email"
                            label="Email Address"
                            onChange={(e) =>
                                setRegisterData({ ...registerData, email: e.target.value })
                            }
                        />
                        <InputBox 
                            type="text" 
                            placeholder="Enter your First Name"
                            label="First Name"
                            onChange={(e) =>
                                setRegisterData({ ...registerData, userName: e.target.value })
                            }
                        />
                        <InputBox 
                            type="text" 
                            placeholder="Enter your Last Name"
                            label="Last Name"
                            onChange={(e) =>
                                setRegisterData({ ...registerData, email: e.target.value })
                            }
                        />
                        {/* <InputBox 
                            type="password" 
                            placeholder="Enter your password"
                            label="Password"
                            showToggle={true}
                            onChange={(e) =>
                                setRegisterData({ ...registerData, password: e.target.value })
                            }
                        /> */}
                    </div>

                    <hr className="w-full border-t border-gray-300" />
                    <Button text={"Create Account"} onclick={register} />

                    <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Already have an account? 
                            <button 
                                className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 hover:underline transition-colors"
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
