import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const NotFound = () => {
   return (
      <section className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100svh' }} >
         <h2 className="text-center mb-5" >404 - Not Found the Page</h2>
         <Link to="/" className="btn btn-outline-light" style={{fontSize: '1.5rem'}} >
            Return Home <BsArrowRight />
         </Link>
      </section>
   );
}
 
export default NotFound;