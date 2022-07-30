import React from "react";

//dummy comment
const PostCard = (props) => {
    const query = "/getBlogPost?name=" + props.name;
    return(
        <div className="col">
        {/* <h1 className="thumbTitle text-center montserrat">{props.name}</h1> */}
        <a href = {query}><div className="postThumbContain"><div className="imgCover"></div><img src={props.thumb} className = "img-fluid"></img></div></a>
        </div>
    )
}

export default PostCard