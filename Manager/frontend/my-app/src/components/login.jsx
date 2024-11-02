import { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./usercontext";

function Login() {
    const [username,setusername]=useState("");
    const [password,setpass]=useState("");
    const [redirec,setredirec]=useState(false);
    const {setuser}=useContext(UserContext)
    async function Handlesubmit(evnt) {
        evnt.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          body: JSON.stringify({username,password}),
          headers: {'Content-Type':'application/json'},
          credentials:'include',
        });
        // console.log(response);
        if(response.ok){
            response.json().then(userinfo =>{
                setuser(userinfo);
                setredirec(true);

            })
        }else{
            alert('Wrong username or password !')
        }
    }

    if(redirec){
       return <Navigate to={'/'} />
    }

    return <div className="login-form-container">
    <form className="login-form" onSubmit={Handlesubmit}>
        <h2>Login</h2>
        <div className="form-group">

        <input type="text" placeholder="username" name="username" value={username} onChange={evnt => setusername(evnt.target.value)}></input>
        </div>
        <div className="form-group">

        <input type="password" placeholder="password" name="password" value={password} onChange={evnt => setpass(evnt.target.value)}></input>
        </div>
        <button className="login-button">Login</button>
    </form>
    </div>;
}

export default Login;