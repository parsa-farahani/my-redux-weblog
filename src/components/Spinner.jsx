const Spinner = ({ text = "" }) => {
   return (
      <div className="d-flex flex-column justify-content-center align-items-center">
         <span className="loader" style={{ width: "40px", height: "40px" }}></span>
         <span className="d-inline-block h5">
            {
               text
            }
         </span>
      </div>
   );
}
 
export default Spinner;