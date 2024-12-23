import { Link, NavLink } from "react-router-dom";

const Header = () => {
   return (
      <header className="navbar navbar-dark bg-dark px-2 py-3" >
         <div className="container">
            <nav className="d-flex gap-2" >
               <h1 className="h3 my-auto me-4" style={{ color: "#715bff" }} >
                  My Redux Weblog
               </h1>
               <NavLink to="/" className="btn btn-outline-light" style={({isActive}) => ({opacity: isActive ? .5 : 1})} >
                  Home
               </NavLink>
               <NavLink to="/users" className="btn btn-outline-light" style={({isActive}) => ({opacity: isActive ? .5 : 1})} >
                  Users
               </NavLink>
            </nav>
         </div>
      </header>
   );
}
 
export default Header;