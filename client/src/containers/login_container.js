import React, { useState } from 'react';
import { Login } from '../components/login';
import {instance} from '../utils/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const Login_smart = (props)=> {
    const [input, setInput] = useState({});
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    function TakeInput(event) {
        setInput({ ...input, [event.target.id]: event.target.value });
    }

    function handleLogin() {
        console.log("login", input);
        console.log("hello");
        var pr = instance.post('/login', input);

        pr.then((response) => {
            const token = response.data.token;
            console.log('loggedin', response.data);
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('username', response.data.username);
            if (response.data.success) {
                navigate("/Dashboard");
            }
            else {
                setInvalid(true);
            }
        })
    }

    return (
        <Login sts={invalid} input={TakeInput} login={handleLogin} />
    )
}

export default Login_smart;
