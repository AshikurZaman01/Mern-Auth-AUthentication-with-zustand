import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { useAuthStore } from '../../Store/authStore';

const EmailVerification = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);
    const navigate = useNavigate();

    const { verifyEmail, isLoading, error } = useAuthStore();

    // Handle input change
    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length > 1) {
            // Handle paste scenario
            const pasteCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pasteCode[i] || "";
            }
            setCode(newCode);
            // Move focus to the last filled input
            const nextIndex = pasteCode.length - 1;
            inputRef.current[nextIndex]?.focus();
        } else {
            // Handle single character input
            newCode[index] = value;
            setCode(newCode);

            // Move to the next input box if value is entered
            if (value && index < inputRef.current.length - 1) {
                inputRef.current[index + 1]?.focus();
            }
        }
    };

    // Handle keyboard navigation between inputs
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        const verificationCode = code.join('');

        try {
            await verifyEmail(verificationCode);
            console.log("Email verified successfully");
            navigate('/');
        } catch (error) {
            console.error("Email verification failed:", error);
        }
        // Submit the code to the server or perform any other action
        console.log("Code submitted: ", code.join(''));
    };

    // Auto-submit when all inputs are filled
    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit();
        }
    }, [code]);

    return (
        <div className='flex justify-center items-center h-screen bg-gray-900'>
            <div className='max-w-md w-full bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
                >
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
                        Verify Your Email
                    </h2>
                    <p className='text-center text-gray-300 mb-6'>
                        Enter the 6 digit code sent to your email address.
                    </p>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='flex justify-between items-center'>
                            {
                                code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => inputRef.current[index] = el}
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        type="text"
                                        className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-800 focus:border-green-500 focus:outline-none rounded-md'
                                    />
                                ))
                            }
                        </div>
                        {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}

                        <div>
                            <motion.button
                                className="mt-1 mb-5 w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? <FaSpinner className="w-6 h-6 animate-spin mx-auto text-center" /> : "Verify"}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default EmailVerification;
