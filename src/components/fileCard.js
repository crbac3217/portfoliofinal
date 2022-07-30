import React from "react";

const FileCard = (props) => {
    const query = '/getBlogPost?name=' + props.name;
    return(
        <div className="cardEach">
        <h1 className="thumbTitle text-center montserrat">{props.name}</h1>
        <a href={query}><div className="thumbContain"><div className="imgCover"></div><img src={props.thumb} className = "imgThumb"></img></div></a>
        </div>
    )
}

export default FileCard