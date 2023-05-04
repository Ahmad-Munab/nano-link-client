import NavBar from "./components/NavBar";
import useAuth from "./hooks/useAuth";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Auth from "./components/Auth";
import { getURLs, createURL } from "./api";
import UrlComponent from "./components/UrlComponent";

export interface URL {
  clicks: number;
  long: string;
  short: string;
  userId: string;
  __v: number;
  _id: string;
}

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [urls, setUrls] = useState<URL[]>([]);

  const long = useRef<HTMLInputElement>(null);

  const auth = useAuth();
  useEffect(() => {
    if (auth.status) {
      getURLs().then((data) => {
        setUrls(data);
      });
    }
  }, [auth]);

  function handleCreatingURL(e: any) {
    e.preventDefault();
    if (!long.current?.value) return;
    if (long.current.value.trim() === "") {
      long.current.focus();
      return;
    }
    createURL(long.current.value).then((data: URL) => {
      setUrls([...urls, data]);
    });
  }

  return (
    <div className="w-screen h-screen m-0 overflow-hidden ">
      <NavBar setShowAuth={setShowAuth} />
      {showAuth ? (
        <Auth />
      ) : (
        <main className="flex justify-center bg-blue-50 h-max">
          <div className="flex flex-col w-5/6">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-start  p-20 text-6xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600"
            >
              Long links? <br />
              Not a problem
            </motion.h1>

            <form
              className="flex rounded-md shadow-lg w-full md:mx-auto  mt-24"
              onSubmit={(e) => {
                auth.status ? handleCreatingURL(e) : setShowAuth(true);
              }}
            >
              <input
                ref={long}
                type="text"
                id="hs-trailing-button-add-on"
                name="hs-trailing-button-add-on"
                placeholder="Long URL"
                className="py-3 pl-4 w-full border-2 rounded-l-lg text-md focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-md"
              >
                Shorten
              </button>
            </form>

            <motion.div transition={{ duration: 0.5 }}>
              {urls.map((url) => {
                return <UrlComponent url={url} key={url._id} />;
              })}
            </motion.div>
          </div>
        </main>
      )}
    </div>
  );
};
export default App;
