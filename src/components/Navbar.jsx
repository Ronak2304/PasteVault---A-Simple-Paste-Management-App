import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex justify-center items-center flex-row gap-5 text-xl ">
        <NavLink to="/" className="hover:text-blue-200">
            Home
        </NavLink>

        <NavLink to="/pastes" className="hover:text-blue-200">
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar