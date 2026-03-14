import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  if(auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
    <form className="box">
      <h1 className="title">Login</h1>
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="text" placeholder="Username" 
          value={username}
            onChange={(e) => setUsername(e.target.value)}/>
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" 
          value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success">
            Login
          </button>
        </p>
      </div>
    </form>
    </DefaultLayout>
  )
}