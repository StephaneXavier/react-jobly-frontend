import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Register = ({registerUser}) => {
    const initialState = { username: '', password: '', firstName: '', lastName: '', email: '' };
    const [userInfo, setUserInfo] = useState(initialState);
    const history = useHistory();


    const handleChange = (e) => {
        const {name, value} = e.target
        setUserInfo({...userInfo, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault();
        registerUser(userInfo);
        setUserInfo(initialState);
        history.push('/');
    }

    return (
        <Form onSubmit={handleSubmit} >
            <FormGroup >
                <Label for="username"></Label>
                <Input

                    value={userInfo.username}
                    onChange={handleChange}
                    id="username"
                    name="username"
                    placeholder="username"
                    type="text"
                />
            </FormGroup>
            <FormGroup >
                <Label for="password"></Label>
                <Input

                    value={userInfo.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                />
            </FormGroup>
            <FormGroup >
                <Label for="firstName"></Label>
                <Input

                    value={userInfo.firstName}
                    onChange={handleChange}
                    id="firstName"
                    name="firstName"
                    placeholder="first name"
                    type="text"
                />
            </FormGroup>
            <FormGroup >
                <Label for="lastName"></Label>
                <Input

                    value={userInfo.lastName}
                    onChange={handleChange}
                    id="lastName"
                    name="lastName"
                    placeholder="last name"
                    type="text"
                />
            </FormGroup>
            <FormGroup >
                <Label for="email"></Label>
                <Input

                    value={userInfo.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    placeholder="email"
                    type="email"
                />
            </FormGroup>
            <Button>
                Submit
            </Button>
        </Form>
    )
}

export default Register