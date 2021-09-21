import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { url } from "../../helper";
import axios from "axios";
import Cookies from "js-cookie";
import auth from "../../auth";

const Loginpage = (props) => {
    
    const history = useHistory();

    useEffect(()=>{
        auth.logout(()=>{
            history.push('/')
        })
    }, [])


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
        auth.login(username, password, ()=>{
            history.push('/blogs')
        });
    }

	return (
		<div className="view">
			<div className="loginwrapper">
				<div className="centerwrapper">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loginpage;
