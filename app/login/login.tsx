"use client"
import { useCallback, useEffect, useState } from "react"

export const Login = () => {
    const [state, setState] = useState({ email: '', password: ''})

    const handleChange = (e:any) => {
       setState({...state, [e.target.name]: e.target.value})
    }
    const handleSubmit = useCallback(async () => {
        const { email, password} = state;
        if ( email.length && password.length) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  email, password }),
          });
          const data = await response.json();
          if (data.id) {
            document.cookie = `user_id=${data.id}; path=/; max-age=86400`
          }
        }
    }, [state])
    return (
   
<div className="flex flex-col gap-2">
    <h1>Login below</h1>
<input onChange={handleChange} name="email" value={state.email} className="border-black border" />
<input onChange={handleChange} name="password" value={state.password} className="border-black border" />
<button
onClick={handleSubmit}
>Submit</button>
</div>
    )
}