import React from 'react'
import { Container } from 'semantic-ui-react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    let history = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault();

        const axios = require('axios');
        const FormData = require('form-data');
        let data = new FormData();
        data.append('action', 'login');
        data.append('email', formData.email);
        data.append('password', formData.password);

        let config = {
            method: 'post',
            url: 'http://localhost/auth.php',
            headers: data.getHeaders ? data.getHeaders() : { 'Content-Type': 'multipart/form-data' }
            ,
            data: data
        };
        axios(config)
            .then((response) => {

                console.log(JSON.stringify(response.data));
                const token = JSON.stringify(response.data);
                if (response.data === 1) {
                    localStorage.setItem('token', token);
                    history('/')
                    console.log(token)
                } else if (response.data === 0) {
                    alert('Username or password is wrong, try again!')
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <Container>
                <form onSubmit={submitForm}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" onChange={onChangeInput} placeholder="Your email" id="email" value={formData.email} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={onChangeInput} placeholder="New password" id="password" value={formData.password} required />
                    <button type="submit">Login</button>
                </form>
            </Container>
        </>
    )
}

export default Login
