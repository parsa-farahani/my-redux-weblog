import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";


const Header = () => {
   return (
      <header className="navbar navbar-dark bg-dark px-2 py-3" >
         <div className="container">
            <nav className="w-100 d-flex gap-2" >
               <h1 className="h3 my-auto me-4" style={{ color: "#715bff" }} >
                  My Redux Weblog
               </h1>
               <NavLink end to="/" className="btn btn-outline-light" style={ ({isActive}) => ({ opacity: isActive ? .5 : 1 }) } >
                  All Posts
               </NavLink>
               <NavLink end to="/users" className="btn btn-outline-light" style={ ({isActive}) => ({ opacity: isActive ? .5 : 1 }) } >
                  Users
               </NavLink>
               <NavLink end to="/add-post" className="btn btn-success" style={ ({isActive}) => ({ opacity: isActive ? .5 : 1, marginLeft: 'auto' }) } >
                  <span className="icon me-2" >
                     <IoIosAddCircleOutline />
                  </span>
                  <span>
                     Add Post
                  </span>
               </NavLink>
            </nav>
         </div>
      </header>
   );
}
 
export default Header;