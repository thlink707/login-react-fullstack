import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constans";
import type { AuthResponseError } from "../types/types";

export default function Singup() {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  
  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) { 
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/singup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (response.ok) {
        console.log("User created successfully");
        setErrorResponse("");

        goTo("/");
      } else {
        console.error("Something went wrong");
        const json = await response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  if(auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <DefaultLayout>
        <form className="box" onSubmit={handleSubmit}>
          <h1 className="title">Signup</h1>

          {!!errorResponse && <p className="notification is-danger">{errorResponse}</p>}

          <div className="field">
        <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
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
              onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">
                Create User
              </button>
            </p>
          </div>
        </form>
        </DefaultLayout>
  )
}