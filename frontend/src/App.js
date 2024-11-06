import React from 'react';
import AuthProvider from './Context/AuthProvider';
import MainRoute from './Route/Route';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Layouts from './components/Layout/Layout';


const App = () => {
  return (
    <div>
      <AuthProvider>
        <Layouts/>
        <MainRoute/>
     </AuthProvider>
    </div>
  );
};

export default App;