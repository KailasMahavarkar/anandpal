import React, { useRef } from "react";
import { useEffectAsync } from "../../../helper";
import axios from 'axios';
import { url } from "../../../helper";
import { useLocation } from "react-router-dom";

const SingleBlog = () => {

    const location = useLocation();
    const currentID = useRef(location.pathname.split("/").pop());

	useEffectAsync(async () => {
        const result = await axios.get(url(`/api/blog/read/${currentID.current}`));
        console.log(result);
    }, []);

	return <div></div>;
};

export default SingleBlog;
