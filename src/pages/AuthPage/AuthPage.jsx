import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <body className="background">
      <main>
        <span className="relative flex h-3 w-3"></span>
        {showSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
<div className="flex justify-center items-center my-2">
          <span className="text-gray-900 font-semibold mx-2">- or -</span>
        </div>
        <button
          type="submit"
          className="flex mx-auto justify-center rounded-md bg-emerald-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? "Log In" : "Sign Up"}
        </button>
      </main>
    </body>
  );
}
