import React, { useState, useEffect } from "react";
import customToast from "../components/Block/swal/customToast";

const forceToNumber = (n) => {
	const temp = Number(n);

	if (isNaN(temp)) {
		return 0;
	} else {
		return temp;
	}
};

const executor = (func) => {
	const inner = () => {
		return func();
	};
	return inner();
};

const useIncDec = ({
	initalvalue = 0,
	minvalue = 0,
	maxvalue = 100,
	decrementValue = 1,
	incrementValue = 1,
}) => {
	let [valueInstance, setValueInstance] = useState(initalvalue);

	const valueChangeHandler = (value) => {
		const fnum = forceToNumber(value);
		const maxCheck = fnum > maxvalue;

		if (maxCheck) {
			setValueInstance(maxvalue);
			customToast("info", `item cannot be greater than ${maxvalue}`);
		} else {
			setValueInstance(fnum);
		}
	};

	const defaultIncrementHandler = () => {
		const maxCheck = valueInstance >= maxvalue;

		if (maxCheck) {
			customToast("warning", `item cannot be greater than ${maxvalue}`);
			return false;
		} else {
			setValueInstance((x) => x + incrementValue);
			return true;
		}
	};

	const defaultDecrementHandler = () => {
		const minCheck = minvalue >= valueInstance;
		if (minCheck) {
			customToast("warning", `item cannot be less than ${minvalue}`);
			return false;
		} else {
			setValueInstance((x) => x - decrementValue);
			return true;
		}
	};

	const ComponentBlock = ({ onIncrement, onDecrement }) => {
		const incrementHandler = () => {
			return defaultIncrementHandler() && executor(onIncrement);
		};

		const decrementHandler = () => {
			return defaultDecrementHandler() && executor(onDecrement);
		};

		return (
			<div className="indec">
				<button className="indec__dec" onClick={decrementHandler}>
					-
				</button>
				<input
					className="indec__value"
					value={valueInstance}
					onChange={({ target: { value } }) => {
						valueChangeHandler(value);
						console.log(value);
					}}
				/>
				<button className="indec__inc" onClick={incrementHandler}>
					+
				</button>
			</div>
		);
	};

	return [valueInstance, setValueInstance, ComponentBlock];
};

export default useIncDec;
