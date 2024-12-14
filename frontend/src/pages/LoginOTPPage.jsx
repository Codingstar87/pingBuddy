// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, Loader2, Lock, Mail, SquareSquare } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const SEND_OTP = "Send OTP";
// const VERIFY_OTP = "Verify OTP";

// const LoginWithOTPPage = () => {
//   const [stateOfOTPVerification, setStateOfOTPVerification] =
//     useState(SEND_OTP);
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//   });
//   const { login, isLoggingIn } = useAuthStore();

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (stateOfOTPVerification === SEND_OTP) {
//       //sendOTPfunction
//       setStateOfOTPVerification(VERIFY_OTP);
//       toast.success("OTP send successfully");
//     } else if (stateOfOTPVerification === VERIFY_OTP) {
//       //verifyOTP function
//       // if otp is valid
//       toast.success("Login successful");
//       navigate("/home");
//       // else
//       // toast.error("Invalid OTP");
//     }

//     // login(formData);
//   };

//   return (
//     <div className="h-screen grid lg:grid-cols-2">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <SquareSquare className="w-6 h-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Wellcome Back</h1>
//               <p className="text-base-content/60">Sign in to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {stateOfOTPVerification === SEND_OTP && (
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Email</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-base-content/40" />
//                   </div>
//                   <input
//                     type="email"
//                     className={`input input-bordered w-full pl-10`}
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             )}

//             {stateOfOTPVerification === VERIFY_OTP && (
//               <>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-medium">Enter OTP</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-base-content/40" />
//                     </div>
//                     <input
//                       type="text"
//                       className={`input input-bordered w-full pl-10`}
//                       placeholder=""
//                       value={formData.otp}
//                       onChange={(e) =>
//                         setFormData({ ...formData, otp: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-base-content/60">Resend</p>
//                 </div>
//               </>
//             )}

//             <button
//               type="submit"
//               className="btn btn-primary w-full"
//               disabled={isLoggingIn}
//             >
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 stateOfOTPVerification
//               )}
//             </button>
//             <div className="text-center">
//               <p className="text-base-content/60">or</p>
//             </div>

//             <button
//               className="btn btn-primary w-full"
//               disabled={isLoggingIn}
//               onClick={() => {
//                 navigate("/login");
//               }}
//             >
//               {"Sign in with Password"}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link to="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <AuthImagePattern
//         title={"Welcome back!"}
//         subtitle={
//           "Sign in to continue your conversations and catch up with your messages."
//         }
//       />
//     </div>
//   );
// };
// export default LoginWithOTPPage;

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, SquareSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SEND_OTP = "Send OTP";
const VERIFY_OTP = "Verify OTP";

const LoginWithOTPPage = () => {
  const [stateOfOTPVerification, setStateOfOTPVerification] =
    useState(SEND_OTP);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [resendCooldown, setResendCooldown] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // Cooldown period in seconds
  const { login, isLoggingIn,isSigningUp, generateOTP, VerifyOTP } = useAuthStore();

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (stateOfOTPVerification === SEND_OTP) {
  //     generateOTP({
  //       email: formData.email,
  //     });
  //     console.log("data", formData);
  //     setStateOfOTPVerification(VERIFY_OTP);
  //     // startResendCooldown();
  //     // toast.success("OTP sent successfully");
  //   } else if (stateOfOTPVerification === VERIFY_OTP) {
  //     VerifyOTP({
  //       email: formData.email,
  //       otp: formData.otp,
  //     });
  //     // console.log("data", formData);
  //     // toast.success("Login successful");
  //     navigate("/home");
  //     // else
  //     // toast.error("Invalid OTP");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stateOfOTPVerification === SEND_OTP) {
        const onSuccess = () => {
          setStateOfOTPVerification(VERIFY_OTP);
        };
        await generateOTP({ email: formData.email }, onSuccess);
        console.log("data", formData);
      } else if (stateOfOTPVerification === VERIFY_OTP) {
        const onSuccess = () => {
          navigate("/home");
        };

        await VerifyOTP(
          { email: formData.email, otp: formData.otp },
          onSuccess
        );
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  const handleResendOTP = () => {
    if (resendCooldown) return;

    // Resend OTP logic
    startResendCooldown();
    toast.success("OTP resent successfully");
  };

  const startResendCooldown = () => {
    setResendCooldown(true);
    let timeLeft = 30; // Cooldown period
    setResendTimer(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      setResendTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setResendCooldown(false);
      }
    }, 1000);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <SquareSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Wellcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {stateOfOTPVerification === SEND_OTP && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {stateOfOTPVerification === VERIFY_OTP && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Enter OTP</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-10`}
                      placeholder=""
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({ ...formData, otp: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    type="button"
                    className="link link-primary"
                    onClick={handleResendOTP}
                    disabled={resendCooldown}
                  >
                    {resendCooldown
                      ? `Resend OTP in ${resendTimer}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                stateOfOTPVerification
              )}
            </button>
            <div className="text-center">
              <p className="text-base-content/60">or</p>
            </div>

            <button
              className="btn btn-primary w-full"
              disabled={isSigningUp}
              onClick={() => {
                navigate("/login");
              }}
            >
              {"Sign in with Password"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default LoginWithOTPPage;
