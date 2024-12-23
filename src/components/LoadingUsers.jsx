const LoadingUsers = () => {
   return (
      <div className="loading-modal-cont">
         <div className="loading-modal-inner">
            <p className="h3 d-flex align-items-center">
               <span>
                  Loading
               </span>
               <span className="loader" style={{ width: "40px", height: "40px" }}></span>
            </p>
            <p className="h5">
               Please Wait...
            </p>
         </div>
      </div>
   );
}
 
export default LoadingUsers;