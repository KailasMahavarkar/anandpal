import { useState, useEffect } from "react";

const useIcon = (initalIcon, finalIcon) => {

	const [iconStatus, setIconStatus] = useState(false);
	const [icon, setIcon] = useState(initalIcon);

	useEffect(()=>{
		setIconStatus(false);
	}, [])

	const useIconState = () => {
		iconStatus ? setIcon(finalIcon): setIcon(initalIcon);	
		setIconStatus(!iconStatus);
	};
	return [icon, useIconState, iconStatus];
};


export default useIcon;
