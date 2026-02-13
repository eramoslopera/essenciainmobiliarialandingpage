import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface PhoneMockupProps {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className, dark = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className={clsx(
                "relative mx-auto border-gray-900 dark:border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden",
                className
            )}
        >
            {/* Camera/Notch Area */}
            <div className="h-[32px] w-full absolute top-0 left-0 bg-gray-900 z-20 flex justify-center rounded-t-[2rem]">
                <div className="h-[18px] w-[120px] bg-black rounded-b-[1rem] absolute top-0"></div>
            </div>

            {/* Screen Content */}
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 relative z-10">
                {children}
            </div>

            {/* Side Buttons (Purely decorative CSS) */}
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        </motion.div>
    );
};

export default PhoneMockup;
