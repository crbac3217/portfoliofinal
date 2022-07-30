import React, {useEffect, useState} from "react";
import Datacaller from "../services/datacaller.js";
import PostCard from "./PostImgCard.js";
import Masonry from 'react-masonry-css'

const PostList = () => {
        useEffect(() => {
        findAllPosts();
    }, []);
    function findAllPosts(){
        Datacaller.getAll(0).then(response => {
            setPostThumbnails(response.data)
        }).catch(e => {
            console.log(e)
        })
    }
    const [posts, setPosts] = useState([]);
    const setPostThumbnails = (response) => {
        console.log(response)
        setPosts(response.blogdatas); 
    }
    return(
        <div>
        <Masonry
        style={{backgroundColor:"#D3D1A6"}}
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {posts.map((post) => <PostCard key= {post._id} name={post.name} thumb={post.img[0]} />)}
        </Masonry>
        </div>
    )
}

export default PostList;