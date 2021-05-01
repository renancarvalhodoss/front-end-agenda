import React, { useEffect, useState } from "react";
import axios from 'axios';
import { IoTimeOutline, IoCalendarOutline } from "react-icons/io5";


const ListaReunioes = () => {

    const [reun, setreun] = useState([]);
    const [convidados, setconvidados] = useState([]);
    const [loading, setloading]= useState(true);


    useEffect(() => {
        axios.get('https://back-end-agenda.herokuapp.com/reunioes')
            .then((response) => {
                setreun(response.data)
            })
        axios.get('https://back-end-agenda.herokuapp.com/convidados')
            .then((response) => {
                setconvidados(response.data);
                console.log(response.data)
                setloading(false);
            } )
    }, [])

    if(loading){
        return (
            <div className="load">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="visually-hidden">Buscando reuniões...</div>
        </div>
      )
    }


    return (
        <>
            {reun.map((reun, index) => (

                <div key={index} className="card-list text-white bg-secondary mb-3"  >
                    <div className="card-header "> REUNIÃO <span className="data-reun"><IoCalendarOutline /> {reun.data.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')} </span></div>
                    <div className="card-body">
                        <h5 className="card-title">{reun.name}</h5>
                        <span className="hora-reun"><IoTimeOutline />{reun.hora.replace(/(\d*):(\d*).*/, '$1:$2')}  </span>
                        <div className="card-text">
                            <div className="container">
                                {convidados.filter(c => c.idreuniao === reun.id).map((c, index) => (
                                    <div key={index} className="row align-items-start bg-secondary card2 text-center">
                                        <div className="col ">
                                            <h5>CONVIDADO</h5>
                                            <p>{c.name}</p>
                                        </div>
                                        <div className="col">
                                            <h5>EMAIL</h5>
                                            <p>{c.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ListaReunioes;