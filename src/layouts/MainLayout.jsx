import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import LoadingUsers from "../components/LoadingUsers";


const MainLayout = ( { children, isLoadingUsers } ) => {
   return (
      <>
         <Header />
         <main>
            {
               children
            }
         </main>
         <ToastContainer theme="colored" />
         {
            (isLoadingUsers) && (
               <LoadingUsers />
            )
         }
      </>
   );
}
 

export default MainLayout;