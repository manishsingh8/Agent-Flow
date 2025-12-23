import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

export const useLoginLogic = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    setApiError("");
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!password) return;
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Login failed");
      }
      sessionStorage.setItem("authToken", result.data.token);
      sessionStorage.setItem("tokenType", result.data.tokenType);
      sessionStorage.setItem("username", result.data.username);
      sessionStorage.setItem("fullName", result.data.fullName);
      navigate("/rcm-flows", { replace: true });
    } catch (error: any) {
      setApiError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setPassword,
    emailError,
    apiError,
    loading,
    handleLogin,
    handleEmailChange,
  };
};
