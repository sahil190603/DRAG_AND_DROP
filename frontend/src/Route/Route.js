import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import RegisterForm from "../pages/Register";
import { AuthContext } from "../Context/AuthProvider";
import PrivateRoute from "./PrivetRoute";
import { FamilyTask } from "../pages/Family-Task";


const MainRoute = () => {
  const { role, user } = useContext(AuthContext) ?? {};

  return (
    <div className="App">
      <Routes>
        {/* general route */}
        
        <Route path="/Login" element={!user && <Login />} />
        <Route path="/register" element={<RegisterForm />}/>

        {/* Manager route */}
        {role === 'Manager' && <Route path='/family-task' element={<PrivateRoute><FamilyTask /></PrivateRoute>}/>}
        
       
       {/* Member route */}
      </Routes>
    </div>
  );
};

export default MainRoute;
