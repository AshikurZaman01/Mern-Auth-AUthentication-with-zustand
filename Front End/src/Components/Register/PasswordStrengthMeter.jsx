import { FaCheck, FaTimes } from "react-icons/fa";
import { useMemo } from "react";

const PasswordCriteria = ({ password }) => {
    const criteria = useMemo(() => [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
    ], [password]);

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center">
                    {item.met ? (
                        <FaCheck size={12} className="text-green-400 mr-2" />
                    ) : (
                        <FaTimes size={12} className="text-gray-500 mr-2" />
                    )}
                    <span className={item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

const PasswordStrengthMeter = ({ password }) => {
    const strength = useMemo(() => {
        let strengthScore = 0;
        if (password.length >= 6) strengthScore++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strengthScore++;
        if (/\d/.test(password)) strengthScore++;
        if (/[^a-zA-Z\d]/.test(password)) strengthScore++;
        return strengthScore;
    }, [password]);

    const getColor = (index) => {
        const colors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
        return colors[index] || "bg-gray-600";
    };

    const getStrengthText = (strength) => {
        const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
        return texts[strength] || "";
    };

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Password strength</span>
                <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
            </div>

            <div className="flex space-x-1">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                        ${index < strength ? getColor(index) : "bg-gray-600"}`}
                    />
                ))}
            </div>

            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;
