import { useState } from "react";

function Register(){
    const [username,setuser]=useState("");
    const [password,setpass]=useState("");

    async function Handlesubmit(evnt) {
        evnt.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          body: JSON.stringify({username,password}),
          headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
          alert('registration successful');
        } else {
          alert('registration failed');
        }
      }
    return <div className="login-form-container">
    <form className="login-form" onSubmit={Handlesubmit}>
        <h2>Register</h2>
        <div className="form-group">

        <input type="text" placeholder="username" name="username" value={username} onChange={evnt => setuser(evnt.target.value)}></input>
        </div>
        <div className="form-group">

        <input type="password" placeholder="password" name="password" value={password} onChange={evnt => setpass(evnt.target.value)}></input>
        </div>
        <button className="login-button">Register</button>
    </form>
    </div>
}

export default Register;