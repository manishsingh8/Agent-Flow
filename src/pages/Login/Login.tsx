import RevPlus from "@/assets/icons/rp-logo.svg";
import { useLoginLogic } from "./Login.hook";

const Login = () => {
  const {
    email,
    password,
    setPassword,
    emailError,
    handleLogin,
    handleEmailChange,
    loading,
  } = useLoginLogic();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img src={RevPlus} alt="Logo" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to your account
        </h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              emailError
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#249563]"
            }`}
          />
          {emailError && (
            <p className="text-sm text-red-500 mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#249563]"
          />
        </div>
        <div className="flex justify-end mb-6">
          <button className="text-sm text-[#249563] hover:underline cursor-pointer">
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={!email || !password || !!emailError}
          className={`w-full py-2 rounded-lg font-medium transition ${
            email && password && !emailError
              ? "bg-[#249563] text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "LoggingIn..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
