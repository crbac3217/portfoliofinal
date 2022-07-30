import React, {useState, useEffect} from "react";
import Datacaller from "../services/datacaller.js";
import FileCard from "./fileCard.js";
import Slider from "react-slick";


const Post2D = props => {
    useEffect(() => {
        findByType();
    }, []);
    function findByType(){
        Datacaller.findType("2D").then(response => {
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
    var settings = {
        arrows: true,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
      };
    return(
        <div className="fadeback postsBack" style={{paddingBottom: "25px"}}>
        <div style={{padding:"25px", paddingTop:"15vh"}}>
            <h1 style={{color:"#3A3D34"}} className = "greycliff bold">More on 2D...</h1>
        </div>
        <Slider {...settings}>
        {posts.map((post) => <FileCard key= {post._id} name={post.name} thumb={post.img[0]} id={post._id}/>)}
        </Slider>
        </div>
    )
}

export default Post2D;