import React from "react";

const TextArea = (props) => {
	return (
		<div className="tAcontainer">
			<div className="tArea">
				<div className="tArea__title">Enter Search Requirements</div>
			</div>

			<textarea value={props.inputData} onChange={props.onInputChangeHandler} >
				{props.inputData}
			</textarea>
			<div className="mainbutton">
				<input type="submit" className="largebutton"/>
			</div>
		</div>
	);
};

export default TextArea;
