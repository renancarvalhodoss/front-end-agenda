import React, { useEffect, useRef, useState } from 'react';
import './pages.css';
import { BsPlus } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';



const Cadastro = () => {
    const inputemail = useRef();
    const [frase, setfrase] = useState();
    const [cor, setcor] = useState('bg-dark');
    const [dados, setdados] = useState({});
    const [listreun, setlistreun] = useState([]);
    const [convidado, setconvidado] = useState();
    const [nconv, setnconv] = useState(0);
    const [campos, setcampos]= useState(false);
    const history = useHistory();

    useEffect(() => {
        axios.get('https://back-end-agenda.herokuapp.com/reunioes')
            .then((response) => {
                setlistreun(response.data);
                setfrase('Deseja adicionar convidados?')
            })
    }, [])
  


    const changeCovidados = (e) => {
        const { name, value } = e.target;
        setconvidado({ ...convidado, [name]: value, "reuniaoid": listreun.length + 1 });
        console.log(convidado);
        setcampos(false);
    }

    const changeEmail = (e) => {
        const { name, value } = e.target;
        setconvidado({ ...convidado, [name]: value, "reuniaoid": listreun.length + 1 });
        console.log(convidado);
        setcampos(false);
    }

    const changeDados = (e) => {
        const { name, value } = e.target;
        setdados({ ...dados, "id": listreun.length + 1, [name]: value });
        console.log(dados);
        setcampos(false);
    }

    const Submit = (event) => {
        event.preventDefault();
        const form2 = inputemail.current;
        const { email, hora, data, titulo } = event.target;
        if (convidado) {
            if (email.value === '' || hora.value === '' || form2.convidado.value === '' || data.value === '' || titulo.value === '') {
                setcampos(true);
            } else {
                emailjs.sendForm('service_ly5va6p', 'template_7vhn9eq', event.target, 'user_s1UmVzpsC3iJ3NvVQAxmF')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                event.target.reset();

                axios.post('https://back-end-agenda.herokuapp.com/reunioes', dados)
                    .then((response) => {
                        history.push('/');
                    })
                axios.post('https://back-end-agenda.herokuapp.com/convidados', convidado)
            }
        }
        else if (hora.value === '' || data.value === '' || titulo.value === '') {
            setcampos(true);
        } else {
            emailjs.sendForm('service_ly5va6p', 'template_7vhn9eq', event.target, 'user_s1UmVzpsC3iJ3NvVQAxmF')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            event.target.reset();

            axios.post('https://back-end-agenda.herokuapp.com/reunioes', dados)
                .then((response) => {
                    history.push('/');
                })
            axios.post('https://back-end-agenda.herokuapp.com/convidados', convidado)
        }
    }

    const Tpost = (e) => {

        const form = inputemail.current;

        if (convidado === undefined) {
            setfrase('Para mais convidados clique em add');
            setconvidado(true);
            setcampos(false);
            setnconv(nconv + 1);
        } else {
            if (form.convidado.value === '' || form.email.value === '') {
                setcampos(true);
            } else {
                axios.post('https://back-end-agenda.herokuapp.com/convidados', convidado)
                setnconv(nconv + 1);
                nconv % 2 === 0 ? setcor('bg-dark') : setcor('bg-success');

                emailjs.sendForm('service_ly5va6p', 'template_7vhn9eq', form, 'user_s1UmVzpsC3iJ3NvVQAxmF')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                form.convidado.value = '';
                form.email.value = '';
            }

        }
    }


    return (
        <>
            <div className="create">
                <div className=" card-create text-center  " >
                    <div className="card-body">
                        <h5>AGENDAMENTO DE REUNIÕES</h5>
                    </div>
                </div>

                <div className="container formulario ">
                    <form onSubmit={Submit} ref={inputemail} className="mb-3 row ">
                        <div className="linebtn card-create ">
                            <div className="mb-3  ">
                                <label className="col-sm-3 col-form-label">DATA:</label>
                                <input onChange={changeDados} type="date" name="data" className="form-control" />
                            </div>
                            <div className="mb-3  ">
                                <label className="col-sm-3 col-form-label">HORA:</label>
                                <input onChange={changeDados} type="time" name="hora" className="form-control" />
                            </div>
                        </div>
                        <div className="input-group mb-3 card-create">
                            <span className="input-group-text">TITULO</span>
                            <input onChange={changeDados} type="text" name="titulo" placeholder="Titulo da reunião" className="form-control" />
                        </div>

                        {convidado &&
                            <div className="input-group mb-3 card-create">
                                <span className={` label-conv input-group-text ${cor}`}>{`convidado${nconv}`}</span>
                                <input onChange={changeCovidados} type="text" id={nconv} name="convidado" placeholder="Nome" className="form-control" />
                                <input onChange={changeEmail} type="email" id={nconv} name="email" placeholder="Email" className="form-control" />
                            </div>
                        }

                        <div className=" card-create text-center b2  ">
                            <div className="card-body">
                                <h5 className="card-title">{frase}</h5>
                                <div className="counter">
                                    <div className="card-text card-conv btn-dark">
                                        CONVIDADOS <span className="badge bg-light">{nconv}</span>
                                    </div>
                                    <button onClick={Tpost} type="button" className="btn btn-success line"><BsPlus />add</button> <br />
                                </div>
                            </div>
                        </div>
                        {campos && <div className="user-login__campos">Por favor preencha todos os campos</div>}

                        <div className="d-grid gap-2 btn-submit d-md-block">
                            <button className="btn btn-dark btn-env" name="btn_save" type="submit">SALVAR</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}

export default Cadastro;