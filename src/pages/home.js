import React from 'react';
import Banner from '../components/banner/banner.js';
import './pages.css'
import { FcCalendar, FcPlus } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Banner />
            <Link to='/create'> <button type="button" className="btn btn-outline-dark btn-new"><FcPlus className="plus" /> NOVO AGENDAMENTO </button></Link>
            <Link to='/reunioes'>  <button type="button" className="btn btn-outline-dark btn-custom"><FcCalendar className="plus" /> REUNIÕES </button></Link>
        </>
    )
}

export default Home;