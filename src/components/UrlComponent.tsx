

const API_BASE = import.meta.env.VITE_API_BASE;
import { BsClipboardCheck, BsClipboard } from "react-icons/bs";
import { motion } from "framer-motion";

import { useState } from "react";

{
  /* <motion.div
initial={{ x: 0 }}
animate={{ x: -300 }}
transition={{ delay: 0, duration: 0.5 }}
onAnimationComplete={() => {
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      controls.start({ x: 0 });
    });
  }, 200);
}}
>
</motion.div> */
}

const UrlComponent = ({ url }: any) => {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(`${API_BASE}/${url.short}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }
  const nanoLink = `${API_BASE}/${url.short}`;

  return (
    <div className="flex xl:flex-row flex-col gap-4 justify-between items-center bg-white py-4 2xl:px-8 md:px-4 px-3 rounded-md shadow-lg  mx-32 my-8 text-2xl font-semibold">
      <span className="overflow-x-hidden ">{url.long}...</span>
      <div className="flex items-center gap-2">
        <span
          onClick={() => {
            window.open(nanoLink, "_blank");
          }}
          className="  hover:underline font-sans text-blue-600 cursor-pointer"
        >
          {API_BASE.replace("http://", "")}/{url.short}
        </span>
        <motion.button
          onClick={copy}
          whileHover={{ scale: 1.05 }}
          className="flex text-xl mx-2 transition-all duration-150 ease-in-outflex border-2 border-green-600 bg-green-200 hover:bg-green-300 py-1 px-2 rounded-lg shadow-xl"
        >
          Copy{" "}
          {copied ? (
            <BsClipboardCheck className="py-2 text-4xl" />
          ) : (
            <BsClipboard className="py-2 text-4xl" />
          )}
        </motion.button>
      </div>
      <span className="text-green-600 font-bold">CLicks: {url.clicks}</span>
    </div>
  );
};

export default UrlComponent;
