import {  Route, Routes } from "react-router-dom"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import LogIn from "../pages/LogIn"

function RoutesComp() {
  return (
      <Routes>
        <Route path="/" Component={SignUp}/>
        <Route path="/home" Component={Home}/>
        <Route path="/login" Component={LogIn} />
      </Routes>
  )
}

export default RoutesComp