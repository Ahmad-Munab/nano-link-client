import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { register, login } from "../api";

const Auth = ({ setShowAuth }: any) => {
  const [authType, setAuthType] = useState("register");
  const [authTexts, setAuthTexts] = useState({
    t1: "Sign up for an account",
    t2: "Sign up",
    t3: "Already have an account?",
    t4: "Sign in",
  });

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authType === "register") {
      setAuthTexts({
        t1: "Sign up for an account",
        t2: "Sign up",
        t3: "Already have an account?",
        t4: "Sign in",
      });
    } else {
      setAuthTexts({
        t1: "Sign in to your account",
        t2: "Sign in",
        t3: "Don't have an account yet?",
        t4: "Sign up",
      });
    }
  }, [authType]);

  async function handleAuth(e: any) {
    e.preventDefault();
    if (!username.current?.value || !password.current?.value) {
      return;
    }

    if (authType === "register") {
      await register(username.current.value, password.current.value);
    } else {
      await login(username.current.value, password.current.value);
    }
  }

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-start px-6 py-8 mt-20 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div className="w-full bg-white rounded-lg shadow-2xl  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            {authTexts.t1}
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleAuth}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your Username
              </label>
              <input
                ref={username}
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg border-1 border-blue-400 focus:outline-none focus:border-2 w-full p-2.5 "
                placeholder="Username "
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                ref={password}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg border-1 border-blue-400 focus:outline-none focus:border-2 w-full p-2.5 "
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {authTexts.t2}
            </button>
            <p className="text-sm font-light text-gray-500 ">
              {authTexts.t3}
              <span
                className="font-medium text-blue-600 hover:underline ml-2 cursor-pointer"
                onClick={() =>
                  setAuthType(authType === "register" ? "login" : "register")
                }
              >
                {authTexts.t4}
              </span>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Auth;
