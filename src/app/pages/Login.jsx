import { motion } from "framer-motion";
import { BACKEND_API_URL } from "../redux/constant.js";
import logo from "../../assests/assets.js";

export default function Login() {
    const handleLoginWithGoogle = () => {
        window.location.href = `${BACKEND_API_URL}/admin/login?action=googleLogin`;
    };

    const handleLoginWithMicrosoft = () => {
        window.location.href = `${BACKEND_API_URL}/admin/login?action=microsoftLogin`;
    };

    const video = "https://app.guestpostcrm.com/images/FINAL.webm";

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#e8f0ff] via-[#f3fffa] to-[#f8fff5]">

            {/* LEFT SECTION */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-1 flex-col items-center justify-center px-6 md:px-10"
            >
                {/* Logo */}
                <img
                    src={logo}
                    alt="OutrightRecruitment"
                    className="w-50 mb-10 select-none"
                />

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Login to your account
                </h1>

                {/* Google Login */}
                <button
                    onClick={handleLoginWithGoogle}
                    className="mt-8 w-full max-w-xs flex items-center justify-center gap-3 rounded-full px-4 py-3 border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-800 font-medium">Login with Google</span>
                </button>

                {/* Microsoft Login */}
                <button
                    onClick={handleLoginWithMicrosoft}
                    className="mt-4 w-full max-w-xs flex items-center justify-center gap-3 rounded-full px-4 py-3 border border-gray-300 bg-black text-white shadow-sm hover:bg-gray-900 transition"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                        alt="Microsoft"
                        className="w-5 h-5 bg-white rounded"
                    />
                    <span className="font-medium">Log in with Microsoft</span>
                </button>


            </motion.div>

            {/* RIGHT SECTION (VIDEO) */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex flex-1 items-center justify-center p-6"
            >
                <div className="w-full h-[90vh] rounded-[20px] overflow-hidden shadow-xl relative transparent">

                    <video
                        className="absolute w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src={video} type="video/webm" />
                        {/* fallback if webm fails */}
                        Your browser does not support the video tag.
                    </video>

                </div>
            </motion.div>
        </div>
    );
}