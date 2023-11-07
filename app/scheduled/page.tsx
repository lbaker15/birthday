"use client"
import { useEffect, useState } from "react"
import { cookies } from "../dashboard/cookies"

export default function Page () {
    const [arns, setArns] = useState([]);
    useEffect(() => {
        (async function () {
        const id = cookies('user_id');
        const response = await fetch('/api/get-all', {
            method: 'POST',
            body: JSON.stringify({id})
        })
        const data = await response.json()
        if (data && data.user) {
            const arr:any = [];
        Promise.all(data.user.executionArn.map(async (arn:any) => {
            const response = await fetch('/api/describe', {
                method: 'POST',
                body: JSON.stringify({executionArn: arn})
            })
            const data = await response.json()
            arr.push(data.data);
        })).then(() => {
            setArns(arr)
            console.log('here', arr)
        })
        }
    })()
    }, [])
    const handleClick =  async (executionArn:any) => {
        console.log(executionArn)
        const response = await fetch('/api/cancel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ executionArn }),
          });
       
          const data = await response.json();
          console.log(data);
          //alert here - maybe just update the status on component (make item & this func a child component & hold status in state)
    }
    return (
        <div>
            {arns.length ? arns.map((item:any, index) => {
                return (
                    <div key={'arn' + index}>
                        <h2>{item.name} + {item.status}</h2>
                        <button onClick={() => handleClick(item.executionArn)}>Cancel</button>
                    </div>
                )
            }) : <div>Loading...</div>}
        </div>
    )
}