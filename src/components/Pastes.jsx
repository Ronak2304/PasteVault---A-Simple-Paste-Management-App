import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePaste } from "../redux/pasteSlice";
import { Link, NavLink } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const Pastes = () => {
  const paste = useSelector((state) => state.paste.pastes);
  const [searchItem, setSearchItem] = useState("");
  const filteredData = paste.filter((paste) =>
    paste.pasteTitle.toLowerCase().includes(searchItem.toLowerCase())
);
const dispatch = useDispatch();

  function handleDelete(pasteId) {
    dispatch(deletePaste(pasteId))
  }
  
  return (
    <div className="m-5">
      <input
        type="text"
        placeholder="Search Your Paste"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        className="border-solid border-2 rounded-3xl p-1.5 pl-4 md:w-3xl sm:w-xl"
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste}
                className="border-2 border-solid border-black p-2 pl-5 rounded-4xl"
              >
                <div className="text-4xl font-bold">{paste.pasteTitle}</div>
                <div className="text-xl">{paste.pasteContent}</div>
                <div className="flex flex-row place-content-end gap-5">
                  <button className="p-2 border-2 rounded-3xl hover:bg-amber-100 cursor-pointer w-24">
                    <Link to={`/?pasteId=${paste._id}`}>
                      Edit
                    </Link>
                  </button>
                  <button className="p-2 border-2 rounded-3xl hover:bg-amber-100 cursor-pointer w-24" onClick={()=>
                    handleDelete(paste._id)
                  }>Delete</button>
                  <button className="p-2 border-2 rounded-3xl hover:bg-amber-100 cursor-pointer w-24" >
                    <Link to={`/pastes/${paste._id}`}>
                      View
                    </Link>
                  </button>

                  <CopyToClipboard text={paste.pasteContent}>
                    <button className="p-2 border-2 rounded-3xl hover:bg-amber-100 cursor-pointer w-24" onClick={()=>
                      toast.success("Content copied to clipboard")
                    }>Copy</button>
                  </CopyToClipboard>
                  <button className="p-2 border-2 rounded-3xl hover:bg-amber-100 cursor-pointer w-24">Share</button>
                </div>
                <div>
                  {new Date(paste.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' })}
             
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Pastes;
