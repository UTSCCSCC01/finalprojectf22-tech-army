import { useState } from "react";
import axios from 'axios';
import './signupLogin.css';
import { useNavigate } from "react-router-dom";

import {
    validatePassword,
} from '../Utils/Common';

function Signup() {

    const initialValues = { username: "", mailAddress: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        const body = { name: formValues.username, email: formValues.mailAddress, password: formValues.password };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        axios.post('http://localhost:8000/api/users',  body, axiosConfig)
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(error => {
            console.error(error);
        })
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[a-zA-Z0-9_.+-]+@mail.utoronto.ca$/;
        if(!values.username){
            errors.username = "Please enter the username";
        }
        if(!values.mailAddress){
            errors.mailAddress = "Please enter your email address";
        }
        else if (!regex.test(values.mailAddress)){
            errors.mailAddress = "Please enter the valid mail address";
        }
        errors.password = validatePassword(values.password);
        return errors;
    }
  return (
    <>
    <header>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="UTSC Hub logo"></img>
    </header>
        <div className="formContainer">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Signup Form</h1>
                <hr />
                <div className="uiForm">
                    <div className="formField">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <p className="errorMsg">{formErrors.username}</p>
                    <div className="formField">
                        <label>Mail Address</label>
                        <input
                            type="text"
                            placeholder="Mail Address"
                            name="mailAddress"
                            onChange={(e) => handleChange(e)} />
                    </div>
                    <p className="errorMsg">{formErrors.mailAddress}</p>
                    <div className="formField">
                        <label>Password</label>
                        <input type="text"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)} />
                    </div>
                    {formErrors.password?.length && <p className="errorMsg">Passwords must satisfy the following criteria:</p>}
                    {formErrors.password?.map(errorMsg => {
                        return <p className="errorMsg">• {errorMsg}</p>
                    })}
                    <button className="submitButton">Create Your Account</button>
                </div>
            </form>
        </div>
    </>
  );
}

export default Signup;
