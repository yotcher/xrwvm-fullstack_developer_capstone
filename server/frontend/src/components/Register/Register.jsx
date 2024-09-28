import "./Register.css";
import React, { useState } from 'react';
import Header from '../Header/Header';
const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [open,setOpen] = useState(true)


    let register_url = window.location.origin+"/djangoapp/register";

    const register = async (e) => {
        e.preventDefault();
    
        const res = await fetch(register_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "userName": userName,
                "password": password,
                "email": email,
            }),
        });
        const json = await res.json();
        if (json.status != null && json.status === "User created") {
            sessionStorage.setItem('username', json.userName);
            setOpen(false);        
        }
        else {
          alert("The user could not be created.")
        }
    };

    if (!open) {
        window.location.href = "/";
      };

    return (
    <div>
      <Header/>
      <form className="login_panel" style={{}} onSubmit={register}>
              <div>
              <span className="input_field">Username </span>
              <input name="text" type="username"  placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>            
              </div>
              <div>
              <span className="input_field">First Name </span>
              <input type="text"  name="firstname" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div>
              <span className="input_field">Last Name </span>
              <input name="text" type="lastname"  placeholder="Password" className="input_field" onChange={(e) => setLastName(e.target.value)}/>            
              </div>
              <div>
              <span className="input_field">Email </span>
              <input name="text" type="email"  placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)}/>            
              </div>
              <div>
              <span className="input_field">Password </span>
              <input name="psw" type="password"  placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>            
              </div>
              <div>
              <input className="action_button" type="submit" value="Register"/>
              <input className="action_button" type="button" value="Cancel" onClick={()=>setOpen(false)}/>
              </div>
        </form>
    </div>
    )
}
 export default Register