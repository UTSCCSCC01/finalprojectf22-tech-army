import { useState } from "react";
import axios from 'axios';

function Signup() {

    const initialValues = { username: "", mailAddress: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        const body = { name: formValues.username, email: formValues.mailAddress, password: formValues.password };
        axios.post('http://localhost:8000/api/users', { body })
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        })
    }

    const validate = (values) => {
        const errors = {};
        if(!values.username){
            errors.username = "Please enter the username";

        }
    }
  return (
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
                <div className="formField">
                    <label>Mail Address</label>
                    <input
                      type="text"
                      placeholder="Mail Address" 
                      name="mailAddress"
                      onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="formField">
                    <label>Password</label>
                    <input type="text"
                      placeholder="Password" 
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                </div>
                <button className="submitButton">Signup</button>
            </div>
        </form>
    </div>
  );
}

export default Signup;
