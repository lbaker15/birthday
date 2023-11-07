"use client"
import { useCallback, useEffect, useState } from "react"

export const Create = () => {
    const [state, setState] = useState({name: '', email: '', password: ''})
    useEffect(() => {

    }, [])
    const handleChange = (e:any) => {
       setState({...state, [e.target.name]: e.target.value})
    }
    const handleSubmit = useCallback(async () => {
        const {name, email, password} = state;
        if (name.length && email.length && password.length) {
        const response = await fetch('/api/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await response.json();
          console.log(data);
        }
    }, [state])
    return (
   
<div className="flex flex-col gap-2">
<h1>Signup below</h1>
<input onChange={handleChange} name="name" value={state.name} className="border-black border" />
<input onChange={handleChange} name="email" value={state.email} className="border-black border" />
<input onChange={handleChange} name="password" value={state.password} className="border-black border" />
<button
onClick={handleSubmit}
>Submit</button>
</div>
    )
}