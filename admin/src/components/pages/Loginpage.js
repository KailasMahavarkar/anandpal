import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { url, isEmpty} from "../../helper";
import axios from "axios";
import Cookies from "js-cookie";
import auth from "../../auth";
import SnackbarProvider from "react-simple-snackbar";
import { useSnackbar } from "react-simple-snackbar";

const SnackBar = () => {
    const [openSnackbar, closeSnackbar] = useSnackbar()
    let errorText = JSON.parse(localStorage.getItem("errorText"));

    useEffect(()=>{

        if (!isEmpty(errorText)){
            if (errorText.msg){
                openSnackbar(errorText.msg, 3000)
                localStorage.removeItem("errorText")
            }
        }

        

    }, [])

    return (<div></div>)
}
const Loginpage = (props) => {
	const history = useHistory();

	useEffect(() => {
		auth.logout(() => {
			history.push("/");
		});
	}, []);

	// const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const usernameChangeHandler = ({ target: { value } }) => {
		setUsername(value);
	};
	const passwordChangeHandler = ({ target: { value } }) => {
		setPassword(value);
	};

	const loginHandler = () => {
		auth.login(username, password, () => {
			history.push("/blogs");
		});
	};

	return (
		<SnackbarProvider>
			<div className="view">
				<div className="loginwrapper">
					<div className="centerwrapper">
                        <div className="centerwrapper__section centerwrapper__adminlogin">
                            Admin Login
                        </div>
						<div className="centerwrapper__section">
							<input
								type="text"
								onChange={usernameChangeHandler}
								placeholder="*Username"
								className="centerwrapper__section__input"
								required={true}
							/>
						</div>
						<div className="centerwrapper__section">
							<input
								type="text"
								onChange={passwordChangeHandler}
								placeholder="*Password"
								className="centerwrapper__section__input"
								required={true}
							/>
						</div>
						<div className="centerwrapper__section">
							<button
								className="centerwrapper__section__button"
								type="submit"
								value="submit"
								onClick={loginHandler}
							>
								login
							</button>
							<div className="snackbar snackbar-show"> </div>

							<SnackBar></SnackBar>
						</div>
					</div>
				</div>
			</div>
		</SnackbarProvider>
	);
};

export default Loginpage;
