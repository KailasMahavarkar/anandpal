import React from "react";

import editIcon from '../../../src/assets/editIcon.svg'
import deleteIcon from '../../../src/assets/deleteIcon.svg'
import createIcon from '../../../src/assets/createIcon.svg'

import { useHistory } from "react-router-dom";
import Navbar from "../blocks/Navbar";


const Blogpage = (props) => {
	let history = props.history;

	return (
		<div className="view">
            <div className="blogposts">
                <a href="/newblog" class='alink blogposts__item'>
                    <div className="blogposts__item__main" >
                        <div className="blogposts__item__main__createicon" >
                            <img src={createIcon} alt="edit-icon" width='150px' height='150px' />
                        </div>
                        <div className="blogposts__item__main__createtext">
                            Create New Blog
                        </div>
                    </div>
                </a>
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
