import React from "react";

import editIcon from '../../../src/assets/editIcon.svg'
import deleteIcon from '../../../src/assets/deleteIcon.svg'
import createIcon from '../../../src/assets/createIcon.svg'

import { Link, useHistory } from "react-router-dom";
import auth from '../../auth';
import Loginpage from "./Loginpage";
import Navbar from "../blocks/Navbar";


const Blogpage = (props) => {

    const history = useHistory();

    const logoutHandler = () =>{
        auth.logout(()=>{
            history.push('/')
        })
    }

	return (
        <div className="view">
            <Navbar />
            <div className="blogposts">
                <Link to='/newblog'>
                    <div className='alink blogposts__item'>
                        <div className="blogposts__item__main" >
                            <div className="blogposts__item__main__createicon" >
                                <img src={createIcon} alt="edit-icon" width='150px' height='150px' />
                            </div>
                            <div className="blogposts__item__main__createtext">
                                Create New Blog
                            </div>
                        </div>
                    </div>
                </Link>
                
				<div className="blogposts__item">
					<div className="blogposts__item__title">Hi this is my blog with some random title </div>
					<div className="blogposts__item__inner">
						<div className="blogposts__item__inner__edit">
							<img src={editIcon} alt="edit-icon" width='50px' height='50px' />
						</div>
						<div className="blogposts__item__inner__delete">
                            <img src={deleteIcon} alt="edit-icon" width='30px' height='50px' />
						</div>
					</div>
					<div className="blogposts__item__timestamp">July 18 2021</div>
				</div>
                

			</div>
		</div>
	);
};

export default Blogpage;
