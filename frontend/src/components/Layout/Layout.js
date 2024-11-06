import React, { useContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { AuthContext } from '../../Context/AuthProvider';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import AppButton from '../Generic/AppButton';
import '../../Style/Layout.css'; 


const { Header } = Layout;

const Layouts = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user, logoutUser } = useContext(AuthContext) ?? {};
  const [isLoading, setIsLoading] = useState(false);


  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return 'Loading...';

  return (
    <Layout style={{ minHeight: '10vh' }}>
      <Header style={{ position: 'fixed', width: '100%', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#808080' }}>
        <div className="logo" style={{ fontFamily: 'Brush Script', fontSize: '24px' }}>Family Task</div>
        {!user && location.pathname==='/login' &&  <AppButton label='Register' onClick={() => navigate('/register')}/>}
        {!user && location.pathname==='/register' &&  <AppButton label='Login' onClick={() => navigate('/login')}/>}
        {user && (
          <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
            <FaUserCircle />
            <div className="username" style={{ marginLeft: '8px' }}>{user?.first_name}</div>
            <AppButton label='Logout' onClick={handleLogout} className="btn btn-danger mt-1 pt-1" style={{ marginLeft: '16px' }} />
          </div>
        )}
      </Header>   
     </Layout> 
  );
};
export default Layouts;