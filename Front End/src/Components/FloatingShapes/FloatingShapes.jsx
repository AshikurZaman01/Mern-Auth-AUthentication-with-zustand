import { motion } from 'framer-motion';

const FloatingShapes = ({ color, size, top, left, delay }) => {
    return (
        <motion.div
            className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
            style={{ top: top, left: left }}
            animate={{
                y: ["0%", "-50%", "0%", "50%", "0%"], // Move up and down
                x: ["0%", "30%", "-30%", "50%", "-50%"], // Move side to side
                rotate: [0, 360], // Rotate the shape
            }}
            transition={{
                duration: 30, // Longer duration for smoother motion
                ease: 'easeInOut', // Smooth easing
                repeat: Infinity, // Infinite looping
                delay, // Delay from props
            }}
            aria-hidden="true"
        />
    );
};

export default FloatingShapes;
