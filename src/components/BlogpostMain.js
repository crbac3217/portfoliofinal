import React, {useEffect, useState} from "react";
import Datacaller from "../services/datacaller.js";
import Postimg from './Postimg.js'
import Masonry from 'react-masonry-css'

const BlogpostMain = props => {
    useEffect(() => {
        findByName();
    }, []);
    function findByName(){
        Datacaller.findName(props.name).then(response => {
            setPostInput(response.data)
        }).catch(e => {
            console.log(e)
        })
    }
    const [post, setPost] = useState([]);
    const [postimg, setPostimg] = useState([]);
    const setPostInput = (response) => {
        setPost(response.blogdatas[0]);
        setPostimg(response.blogdatas[0].img);
        console.log(response.blogdatas[0].img)
    }
    return(
        <div className="postSingle"  style={{backgroundColor:"#D3D1A6"}}>
        <h1 className="postHead greycliff bold">{post.name}</h1>
        <p className="postYear">{post.year}</p>
        <p className="postBody">{post.bodytext}</p>
        <div>
        <Masonry
        style={{backgroundColor:"#D3D1A6"}}
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {postimg.map((img) => <Postimg key= {img} thumb={img}/>)}
        </Masonry>
        </div>
        </div>
    )
}

export default BlogpostMain;