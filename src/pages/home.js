import React from 'react';
import Banner from '../components/banner/banner.js';
import './pages.css'
import { FcCalendar, FcPlus } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Banner />
            <div className="text-center">
            <Link to='/create'> <button type="button" className="btn btn-outline-dark btn-new"><FcPlus className="plus" /> NOVO AGENDAMENTO </button></Link>
           </div>
           <div className="text-center">
            <Link to='/reunioes'>  <button type="button" className="btn btn-outline-dark btn-custom"><FcCalendar className="plus" /> MEUS AGENDAMENTOS</button></Link>
            </div>
        </>
    )
}

export default Home;