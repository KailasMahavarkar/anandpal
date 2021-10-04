import React, { useState, useEffect } from "react";
import SnackBar from "../blocks/SnackBar";

const TestPage = () => {
	const [bar, setBar] = useState(false);

	useEffect(()=>{
        setBar(true);
    }, [])

	return bar ? (
		<>
			<div >
				<SnackBar MESSAGE="Hello World"></SnackBar>
			</div>
		</>
	) : null;
};

export default TestPage;
