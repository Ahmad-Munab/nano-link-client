import useAuth from "../hooks/useAuth";

import { useState } from "react";

import { motion } from "framer-motion";

import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

function NavBar({ setShowAuth }: any) {
  const [auth] = useState(useAuth());
  const [dropdown, setDropdown] = useState(false);

  // useEffect(() => {
  //     const jwt = localStorage.getItem("jwt")
  //     if (jwt) {
  //            axios.get(API_BASE+"/api/user").then(
  //             res: string => JSON.parse(res)
  //            )
  //     }
  // }, [])

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    window.location.reload();
  }

  return (
    <div className="flex justify-between align-middle w-full p-4 2xl:px-64 xl:px-40  shadow-2xl border-b-4  border-indigo-300">
      <div className="flex gap-3 h-fit">
        <img className="w-16 h-16" src="./nano-link.PNG" alt="Nano Link" />
        <span className="my-auto font-seirf text-center text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
          Nano Link
        </span>
      </div>
      <div>
        {auth.status ? (
          <button
            type="button"
            onClick={() => setDropdown(!dropdown)}
            className="flex transition duration-150 ease-in-out m-2 shadow-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  hove focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            {auth.username}
            <span className="pt-1 pl-3">
              {dropdown ? <AiOutlineUp /> : <AiOutlineDown />}
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowAuth(true);
            }}
            className="transition duration-150 ease-in-out mt-3 shadow-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:scale-105 hover:-translate-y-1 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md md:px-5 px-4 md:py-2.5 py-2 text-center"
          >
            Sign Up
          </button>
        )}
        {dropdown && (
          <motion.div
            className="flex justify-center items-center z-10 absolute "
            initial={{ y: -10 }}
            animate={{ y: 2 }}
          >
            <motion.button
              whileHover={{ scale: 1.07 }}
              onClick={signOut}
              className="flex m-2 shadow-xl text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br  hover:-translate-y-1 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-md px-5 py-2.5 text-center"
            >
              Sign Out
            </motion.button>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}

export default NavBar;
