import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../components/context/context';


function initialStatte() {
  return { user: '', password: '' };
}

const UserLogin = () => {

  const { token, settoken } = useContext(Context);
  console.log(token);

  const history = useHistory();
  const [erro, seterro] = useState(false);
  const [values, setvalues] = useState(initialStatte);

  function onChange(event) {
    seterro(false);
    const { value, name } = event.target;
    setvalues({
      ...values,
      [name]: value
    });
    console.log(values)
  }

  async function handleLogin (e) {
    e.preventDefault();

    await axios.post('http://localhost:5000/sistema/session', values)
   .then( (response) =>{
     localStorage.setItem('token', JSON.stringify(response.data.token));
    console.log(response.data);
    settoken(response.data.token);
    history.push('/')
   }).catch(() => {
     seterro(true);
   });
  }


  return (
    <div className="user-login">
      <h1 className="user-login__title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input onChange={onChange} value={values.user} id="user" type="text" name="user" />
        </div>

        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input onChange={onChange} value={values.password} id="password" type="password" name="password" />
        </div>

        {erro && <div className="user-login__error">usuario ou senha invalidos</div>}
        <button type="submit" className="btn btn-success btn-lg btn-login" >Entrar </button>

      </form>
    </div>
  );
};

export default UserLogin;
