import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrorBlock from "../components/Block/ErrorBlock";
import { errorData } from "../data/errors.data";

const error = () => {
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState("");

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	useEffect(() => {
		const e = router.asPath.split("?").pop();
		const xe = "x" + e;

		if (e in errorData) {
			setErrorMsg(errorData[e]);
		} else if (xe in errorData) {
			setErrorMsg(errorData[xe]);
		}
	}, []);

	return (
        <div className="error-page">
            {errorMsg}
        </div>
    )
};

export default error;
