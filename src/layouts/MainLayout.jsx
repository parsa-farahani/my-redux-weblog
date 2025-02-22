import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import LoadingData from "../components/LoadingData";


const MainLayout = ( { isLoadingUsers, isLoadingPosts } ) => {
   return (
      <>
         <Header />
         <main>   
            <Outlet />
         </main>
         <ToastContainer theme="colored" />
         {
            (isLoadingUsers || isLoadingPosts) && (
               <LoadingData />
            )
         }
      </>
   );
}
 

export default MainLayout;