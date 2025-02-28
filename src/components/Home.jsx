import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addtoPastes, updatetoPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
    const [title,setTitle] = useState('');    
    const [content,setContent] = useState('');
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPaste = useSelector((state) => state.paste.pastes)

    useEffect(() => {
        if(pasteId){
            const paste = allPaste.find((p)=>p._id===pasteId);
            setTitle(paste.pasteTitle);
            setContent(paste.pasteContent);
        }
    }, [pasteId])
    


    function CreatePaste() {
        if (title.trim()==="" && content.trim()===""){
            toast.error("Kindly add a Paste");
            return;
        }
        else if (title.trim()!=="" && content.trim()===""){
            toast.error("Kindly add Content of Paste");
            return;
        }
        else if (title.trim()==="" && content.trim()!==""){
            toast.error("Kindly add Title of Paste");
            return;
        }

        const paste = {
            pasteTitle:title,
            pasteContent:content,
            _id: pasteId || Date.now().toString(16),
            createdAt:new Date().toISOString(),
        }
        
       
        
        if(pasteId){
            dispatch(updatetoPastes(paste));
        }
        else{
            dispatch(addtoPastes(paste));
        }

        setTitle('');
        setContent('');
        setSearchParams({});
    }

    return (
        <div className="m-2 flex flex-col gap-5">
            <div className="gap-4 flex">
                <input type="text" placeholder="Enter Title of your paste" value={title} onChange={(e)=>setTitle(e.target.value)} className="border-solid border-2 rounded-3xl p-1.5  md:w-3xl pl-4 sm:w-xl"/>
                <button className="p-2 border-2 rounded-3xl hover:bg-amber-100 cursor-pointer" onClick={CreatePaste}>
                    {pasteId?"Update Paste":"Create Paste"}
                </button>
            </div>
            <div>
                <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write your paste" rows={20} className="md:w-3xl sm:w-xl rounded-3xl border-2 pl-4 p-2" />
            </div>
        </div>
    )
}

export default Home