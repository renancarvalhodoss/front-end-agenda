import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/header";
import Routes from "./routes/routes";
import {AuthProvider} from './components/context/context';

function App() {

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
