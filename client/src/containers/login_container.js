import React, { useState, useEffect } from 'react';
import { Login } from '../components/login';
import {instance} from '../utils/AxiosConfig';
import { withRouter } from "react-router-dom";
import setAuthorizationToken from "../utils/AxiosConfig";

const Login_smart = (props)=> {
    const [input, setInput] = useState({});
    const [invalid, setInvalid] = useState(false);

    function TakeInput(event) {
        setInput({ ...input, [event.target.id]: event.target.value });
    }

    function handleLogin() {
        console.log("login", input);
        console.log("hello");
        var pr = instance.post('/login', input);

        pr.then((response) => {
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('jwtToken', token)

            if (response.data.Status === 'S') {
                props.history.push("/Dashboard");
            }
            else if (response.data.Status === 'F') {
                setInvalid(true);
            }
        })
    }

    return (
        <Login sts={invalid} input={TakeInput} login={handleLogin} />
    )
}

export default withRouter(Login_smart);
