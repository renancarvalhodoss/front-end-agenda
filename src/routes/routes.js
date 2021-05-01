import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Create from '../pages/create';
import Home from '../pages/home';
import ListaReunioes from '../pages/listaReunioes';
import Login from '../pages/login';
import {Context} from '../components/context/context';

function PrivateRoute ({isPrivate, ...rest}) {
const {token} = useContext(Context);

    if(isPrivate && !token ){
        return <Redirect to="/login"/>
    }
    return <Route{...rest}/>;
}

const Routes = () => {
    return (
        <BrowserRouter>
                <Switch>
                <PrivateRoute isPrivate exact path="/" component={Home} />
                    <PrivateRoute  path="/login" component={Login} />
                    <PrivateRoute isPrivate exact path="/create" component={Create} />
                    <PrivateRoute isPrivate exact path="/reunioes" component={ListaReunioes} />
                </Switch>
        </BrowserRouter>
    );

};

export default Routes;