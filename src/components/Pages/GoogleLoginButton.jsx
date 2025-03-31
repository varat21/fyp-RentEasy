// import React from "react";
// import { Button } from "@mantine/core";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();
//   const googleClientId = "878458162863-fad05ulpmi61eqhdqhs240fi5elh7f3j.apps.googleusercontent.com";
//   const googleRedirectUrl = "http://localhost:3000/auth/google/callback";

//   const handleGoogleLogin = () => {
//     // Open Google OAuth consent screen
//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUrl}&response_type=code&scope=profile email&access_type=offline`;
//     window.location.href = authUrl;
//   };

//   // Check if we're on the callback page
//   React.useEffect(() => {
//     if (window.location.pathname === "/auth/google/callback") {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get('code');
      
//       if (code) {
//         // Exchange code for token via backend
//         const exchangeCode = async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost/rent-easy/auth/google-auth.php?code=${code}`
//             );
            
//             if (response.data.success) {
//               localStorage.setItem("token", response.data.token);
//               toast.success("Google login successful");
              
//               // Redirect based on user type
//               const userType = response.data.userType;
//               if (userType === "admin") {
//                 navigate("/navbar/dashboard");
//               } else {
//                 navigate("/");
//               }
//             } else {
//               toast.error(response.data.message);
//               navigate("/login");
//             }
//           } catch (error) {
//             console.error("Google login error:", error);
//             toast.error("Failed to login with Google");
//             navigate("/login");
//           }
//         };
        
//         exchangeCode();
//       }
//     }
//   }, [navigate]);

//   return (
//     <Button 
//       fullWidth 
//       variant="light" 
//       color="blue" 
//       onClick={handleGoogleLogin}
//       leftIcon={<FcGoogle size={20} />}
//     >
//       Continue with Google
//     </Button>
//   );
// };

// export default GoogleLoginButton;



import React, { useEffect } from "react";
import { Button } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const googleClientId = "878458162863-fad05ulpmi61eqhdqhs240fi5elh7f3j.apps.googleusercontent.com";
  const googleRedirectUrl = "http://localhost:3000/auth/google/callback";

  const handleGoogleLogin = () => {
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", googleClientId);
    authUrl.searchParams.append("redirect_uri", googleRedirectUrl);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "profile email");
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");
    
    window.location.href = authUrl.toString();
  };

  useEffect(() => {
    if (window.location.pathname === "/auth/google/callback") {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        toast.error(`Google login failed: ${error}`);
        navigate("/login");
        return;
      }

      if (code) {
        const exchangeCode = async () => {
          try {
            const response = await axios.get(
              `http://localhost/rent-easy/auth/google-auth.php`,
              { params: { code } }
            );

            if (response.data.success) {
              localStorage.setItem("token", response.data.token);
              toast.success("Google login successful");

              // Redirect based on user type
              switch (response.data.userType) {
                case "admin":
                  navigate("/admin/dashboard");
                  break;
                case "landlord":
                  navigate("/landlord/dashboard");
                  break;
                default:
                  navigate("/");
              }
            } else {
              toast.error(response.data.message);
              navigate("/login");
            }
          } catch (err) {
            console.error("Google login error:", err);
            toast.error(err.response?.data?.message || "Login failed");
            navigate("/login");
          }
        };

        exchangeCode();
      }
    }
  }, [navigate]);

  return (
    <Button
      fullWidth
      variant="light"
      color="blue"
      onClick={handleGoogleLogin}
      leftIcon={<FcGoogle size={20} />}
      style={{ marginTop: 10 }}
    >
                      <FcGoogle className="mr-2" />
        
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;