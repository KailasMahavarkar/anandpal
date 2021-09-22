import React, { useState, useEffect } from "react";

import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";

import { Link, useHistory } from "react-router-dom";
import auth from "../../auth";
import Loginpage from "./Loginpage";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync, isEmpty, randomHash } from "../../helper";


const Blogpage = (props) => {
	const history = useHistory();
	const [blogs, setBlogs] = useState([]);

	const logoutHandler = () => {
		auth.logout(() => {
			history.push("/");
		});
	};


    const blogDeleteHandler = async ({target: {alt}}) => {

        if (window.confirm(`Do you want to delete ${alt}`)) {
            try{
                const deleteBlog = await axios.delete(
                    url(`/blog/delete`),
                    {
                        headers: {},
                        data:{
                            blogID: alt 
                        }
                    }
                    
                )
                if (deleteBlog.status === 200){
                    console.log(blogs);
                }
            }catch(error){
                console.log(error.response.data);
            }


        } else {
            console.log("You pressed cancel!");
        }
    }


    


	useEffectAsync(async () => {
		try {
			const items = await axios.get(
                url("/blog/xread")
            );
			setBlogs(items.data);
		} catch (error) {
			console.log(error.response);
		}
	}, [blogs]);


    const newBlogHandler = () => {
        localStorage.removeItem('currentID');
        const currentID = randomHash();
        localStorage.setItem('currentID', currentID);

        // edge case -> user tries to edit localstorage
        if (!localStorage.getItem(currentID)){
            history.push('/');
        }

        history.push(`/blogs/${currentID}`)
    }

    const viewPageHandler = ({target: {alt}})  => {
        localStorage.setItem('currentID', alt)

        history.push(`/blogs/${alt}`)
    }

	const renderBlogs = () => {
        if (blogs.length > 0){

            return blogs.map((blog) => {

                return (                    
                    <div className="blogposts__item">
                        <div className="blogposts__item__id">{blog._id}</div>
                        
                        <div className="blogposts__item__title">{blog.title} </div>
                        <div className="blogposts__item__inner">
                            <div className="blogposts__item__inner__edit">
                                <img src={editIcon} alt={blog._id} width='50px' height='50px' onClick={viewPageHandler} />
                            </div>
                            <div className="blogposts__item__inner__delete">
                                <img src={deleteIcon} alt={blog._id} width='30px' height='50px' onClick={blogDeleteHandler}/>
                            </div>
                        </div>
                        <div className="blogposts__item__timestamp">{new Date(blog.create_ts).toLocaleString()}</div>
                    </div>
                )
            });
        }
		
	};

	return (
		<div className="view">
			<Navbar />
			<div className="blogposts">

                <div className='alink blogposts__item'>
                    <div className="blogposts__item__main" >
                        <div className="blogposts__item__main__createicon" >
                            <img src={createIcon} alt="edit-icon" width='150px' height='150px' onClick={newBlogHandler} />
                        </div>
                        <div className="blogposts__item__main__createtext" onClick={newBlogHandler}>
                            Create New Blog
                        </div>
                    </div>
                </div>

				{renderBlogs()}
			</div>
		</div>
	);
};

export default Blogpage;
