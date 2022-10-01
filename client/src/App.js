import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {

// Getting email address and password from database
const adminUser = {
  name: "John",
  email: "admin@admin.com",
  password: "admin123"
}

// Set the user name and user email once logged in
const [user, setUser] = useState({name: "", email: ""});
// Error checking
const [error, setError] = useState("");

// Login Method 
const Login = details => {
  console.log(details);

  if (details.email === adminUser.email && details.password === adminUser.password){
    console.log("Logged in");
    setUser({
      name: details.name,
      email: details.email
    });
  }else{
    console.log("Email or password is wrong!");
    setError("Email or password is wrong!");
  }
}

const Logout = () => {
  setUser({email: ""});
}

  // Display information once the user is logged in
  return (
    <div className="App">
      {(user.email !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;
