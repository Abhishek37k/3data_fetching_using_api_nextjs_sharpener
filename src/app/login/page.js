"use client";

import React, { useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation"; 
function page() {
  const [formvalues, setFormvalues] = useState({email: "", password: ""});
  const router  = useRouter();

  const H1 = ({ children }) => <h1 className="heading">{children}</h1>;

const validate=()=>{
  let err = {};
  if ( !formvalues.email ){
    err.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formvalues.email)){
    err.email = "Email is invalid";
  }     
  if (!formvalues.password){
    err.password = "Password is required";
  }     

  if ( formvalues.password.length < 6 ){
    err.password = "Password must be at least 6 characters";
  }   

  return err;

}

  const  submitFormHandler =async (e) => {
    e.preventDefault();

    let err = validate();
    if ( Object.keys(err).length ) {
      alert( Object.values(err).join("\n") );
      return;
    }
    console.log(formvalues);



    const res = await fetch('/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formvalues.email, password: formvalues.password })
    });

     setFormvalues({ email: "", password: "" });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      alert("Login successful");
      router.push('/products');
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-box">
        <H1>Login Page</H1>

        <form className="form"  onSubmit={submitFormHandler}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formvalues.email || ""}
            onChange={(e) =>
              setFormvalues({ ...formvalues, email: e.target.value })
            }
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formvalues.password || ""}
            onChange={(e) =>
              setFormvalues({ ...formvalues, password: e.target.value })
            }
          />

          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
