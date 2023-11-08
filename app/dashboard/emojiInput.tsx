"use client";
import React, { useCallback, useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiInput = ({ setState, state }: any) => {
	const [showPicker, setShowPicker] = useState(false);

	const handleChange = (event: any) => {
		const { value } = event.target;
		setState({ ...state, text: value });
	};

	const addEmoji = (emoji: any) => {
		setState({ ...state, text: state.text + emoji.native });
		setShowPicker(false);
	};

	const handleOpen = useCallback(() => {
		setShowPicker(true);
	}, []);

	return (
		<div className="rounded-[75px] md:rounded-full md:min-h-20 relative bg-green p-10 flex flex-col justify-center">
			<label className="text-yellow" htmlFor="text">
				Enter message (remember to say who the message is from!):
			</label>
			<textarea
				rows={3}
				className="shrink-0 bg-transparent text-yellow placeholder:text-yellow"
				id="text"
				value={state.text}
				onChange={handleChange}
				placeholder="Type a message..."
			/>
			<button className="absolute right-6 font-medium" onClick={handleOpen}>
				{showPicker ? "- Close Emojis" : "+ Add Emoji"}
			</button>
			{showPicker && (
				<div className="relative flex justify-center w-full md:block md:w-fit md:absolute  md:bottom-1/2 md:translate-y-1/2 md:right-0">
					{window.innerWidth < 768 ? (
						<Picker
							data={data}
							onClickOutside={() => setShowPicker(false)}
							onEmojiSelect={addEmoji}
							noCountryFlags={true}
							maxFrequentRows={1}
							emojiSize={22}
							perLine={Math.round(window.innerWidth / 100) + 4}
							emojiButtonSize={30}
						/>
					) : (
						<Picker
							data={data}
							onClickOutside={() => setShowPicker(false)}
							onEmojiSelect={addEmoji}
							noCountryFlags={true}
							maxFrequentRows={1}
							emojiSize={22}
							emojiButtonSize={30}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default EmojiInput;
