import { motion } from "framer-motion";
import Input from "./Input";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useAuthStore } from "../../Store/authStore";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Track password visibility

    const navigate = useNavigate();

    const { signUp, error, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);

        try {

            await signUp(email, password, name);
            navigate('/emailVerification');
            console.log("User registered successfully");

        } catch (error) {
            console.log(error);
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full bg-green-500 bg-opacity-50 backdrop-filter backdrop-blur-xl overflow-hidden p-8 rounded-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Name"
                            icon={FaUser}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="mb-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            icon={FaEnvelope}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <Input
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            placeholder="Password"
                            icon={FaLock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Eye icon for toggling password visibility */}
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FaEyeSlash size={20} className="text-gray-400" />
                            ) : (
                                <FaEye size={20} className="text-gray-400" />
                            )}
                        </div>
                    </div>

                    {/* Pass the password state to PasswordStrengthMeter */}
                    <PasswordStrengthMeter password={password} />

                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

                    <motion.button
                        className="mt-1 mb-5 w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <FaSpinner className="w-6 h-6 animate-spin mx-auto text-center"></FaSpinner> : "Submit"}
                    </motion.button>
                </form>

                <div className="px-8 py-4 bg-gray-900 opacity-50 flex justify-center items-center gap-1 rounded-md">
                    <p className="text-sm text-gray-400">Already have an account?{"  "}</p>
                    <Link to={"/"} className="text-green-400 hover:underline">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
