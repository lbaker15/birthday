"use client"
import React, { useCallback, useEffect, useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const EmojiInput = ({setState, state}:any) => {
 
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event:any) => {
    const {value}  = event.target;
    setState({...state, text: value})
  };

  const addEmoji = (emoji:any) => {
    setState({...state, text: state.text + emoji.native});
    setShowPicker(false);
  };

  const handleOpen = useCallback(() => {
    setShowPicker(true)
  }, [])

 

  return (
    <div>
      <input 
        type="text" 
        value={state.text} 
        onChange={handleChange} 
        placeholder="Type a message..." 
      />
      <button onClick={handleOpen}>Add Emoji</button>
      {showPicker && (
        <Picker data={data} onClickOutside={() => setShowPicker(false)} onEmojiSelect={addEmoji} noCountryFlags={true} maxFrequentRows={1} emojiSize={22} emojiButtonSize={30} />
      )}
    </div>
  );
};

export default EmojiInput;
