import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

interface IProps{

}
const RootLayout = ({}:IProps)=>{
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default RootLayout