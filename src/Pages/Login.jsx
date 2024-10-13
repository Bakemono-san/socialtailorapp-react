import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import DataHandler from "../DataHandler";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to manage error messages
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const {value , setValue} = useContext(DataContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    DataHandler.postData("http://localhost:3004/login", { email, password })
      .then((data) => {
        if (data) {
          setValue(data);

          localStorage.setItem("token", data.token);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userId", data.user.id); // Store user ID
          localStorage.setItem("userName", data.user.name); // Store user name
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError("Erreur interne du serveur");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-500">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex justify-center">
        {/* Left part: Login form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
          <div className="flex justify-center gap-4 mb-4 ">
            <button className="bg-gray-100 p-2 rounded-full">G</button>
            <button className="bg-blue-100 p-2 rounded-full">F</button>
            <button className="bg-gray-100 p-2 rounded-full">L</button>
          </div>
          <p className="text-center mb-4 text-gray-500">or use your email account</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-slate-200 text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-slate-200 text-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <p className="text-right text-sm text-blue-600 mb-4 cursor-pointer hover:underline">
              Forgot your password?
            </p>
            <button
              type="submit"
              className={`w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-500">
            Don't have an account?{" "}
            <span className="text-blue-600 underline hover:text-purple-700" onClick={handleSignupRedirect}>
              Sign up now
            </span>
          </p>
        </div>

        {/* Right part: Welcome message */}
        <div className="hidden md:flex md:w-1/2 bg-blue-700 text-white p-8 rounded-r-lg flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="mb-4">
            Register with your personal details to access all our features.
          </p>
          <button
            onClick={handleSignupRedirect}
            className="border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login);
