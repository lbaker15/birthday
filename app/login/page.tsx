"use client"
import { useCallback, useEffect, useState } from "react"
import { Create } from "./create";
import { Login } from "./login";

export default function Page () {
    const [create, setCreate] = useState(false);
  

    return (
        <div>
            <button onClick={() => setCreate(!create)}>{!create ? 'Create User' : 'Login'}</button>
            {!create ? 
            <Login />
        : (
           <Create />
        )}   
        </div>
    )
}