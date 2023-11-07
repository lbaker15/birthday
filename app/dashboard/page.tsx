"use client"

import { useState } from "react";
import EmojiInput from "./emojiInput";
import {cookies} from './cookies';

export default function Page() {
    const [state, setState] = useState<any>({})

    function toISODateString(dateStr:string, timeStr:string) {  
        const dateTimeStr = `${dateStr}T${timeStr}:00.000Z`;
        const date = new Date(dateTimeStr);
        return date.toISOString();
      }

    const handleSubmit = async (event:any) => {
        // const date = '2023-11-07T12:19:00.000Z'; 
    const dateSend = toISODateString(state.date, state.time);
    const id = cookies('user_id')

    if (id) {
        const response = await fetch('/api/step', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: dateSend, user_id: id, message: state.text, subject: '', phone: '+447593368294' }),
        });
     
        const data = await response.json();
        console.log(data);
        //alert here
      } else {
        console.log('not logged in')
      }
      };
    
const handleChange = (e:any) => {
    const {value, name} = e.target;
    setState({...state, [name]: value})
}

      return (
        <div >
          <input onChange={handleChange} type="date" name="date" value={state.date} />
          <input onChange={handleChange} type="time" name="time" value={state.time} />
          <EmojiInput state={state} setState={setState} />
          <button onClick={handleSubmit} >Schedule Notification</button>
        </div>
      );
}
