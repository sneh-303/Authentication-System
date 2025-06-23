import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import { InputOtp } from "@heroui/input-otp";

const Otp_Verification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  // Redirect if no email in location.state
  useEffect(() => {
    if (!email) {
      toast.error("Email not provided. Redirecting...");
      navigate("/login");
    }
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      toast.success(res.data.msg || "OTP Verified");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    try {
      await api.post("/auth/resend-otp", { email });
      toast.success("OTP resent successfully");
      setSecondsLeft(60); // restart timer
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to resend OTP");
    }
  };

  return (
    <GradientBackgroundLayout>
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-10 sm:p-14">
        <form onSubmit={handleOtpVerification} className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-700 text-center">
            OTP Verification
          </h2>
          <p className="text-sm text-center text-gray-600">
            Enter the OTP sent to <span className="font-medium text-indigo-600">{email}</span>
          </p>

          <div className="flex justify-center">
            <InputOtp length={6} value={otp} onValueChange={setOtp} />
          </div>

          <p className="text-xs text-gray-500 text-center">
            OTP expires in: {secondsLeft}s
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            // disabled={secondsLeft > 0}
            onClick={handleResendOtp}
            className={`text-sm w-full text-center mt-2 ${
              // secondsLeft > 0 ? "text-gray-400 cursor-not-allowed" :
               "text-indigo-600 hover:underline"
            }`}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </GradientBackgroundLayout>
  );
};

export default Otp_Verification;
