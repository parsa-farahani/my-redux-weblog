import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import LoadingData from "../components/LoadingData";


const MainLayout = ( { children, isLoadingUsers, isLoadingPosts } ) => {
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
            (isLoadingUsers || isLoadingPosts) && (
               <LoadingData />
            )
         }
      </>
   );
}
 

export default MainLayout;