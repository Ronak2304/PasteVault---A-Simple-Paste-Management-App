import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

const ViewPaste = () => {
    const {id} = useParams();
    const allPaste = useSelector((state)=> state.paste.pastes);

    console.log(allPaste)
    const currentViewPaste = allPaste.find((paste)=>paste._id===id);
    console.log(currentViewPaste)

    return (
      <div className="m-2 flex flex-col gap-5">
              <div className="gap-4 flex">
                  <input type="text" disabled placeholder="Enter Title of your paste" value={currentViewPaste.pasteTitle} className="border-solid border-2 rounded-3xl p-1.5  md:w-3xl pl-4 sm:w-xl"/>
              </div>
              <div>
                  <textarea value={currentViewPaste.pasteContent} disabled placeholder="Write your paste" rows={20} className="md:w-3xl sm:w-xl rounded-3xl border-2 pl-4 p-2" />
              </div>
      </div>
  )
}

export default ViewPaste