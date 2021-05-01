import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header";
import Routes from "./routes/routes";
import {AuthProvider} from './components/context/context';

function App() {
  localStorage.setItem('token',"143r71621seg3t48dys9mu0urËW%WE$%Ë#$er");

  return (
    <>
      <Header />
      <AuthProvider >
      <Routes />
      </AuthProvider>
    </>
  )
}

export default App;
