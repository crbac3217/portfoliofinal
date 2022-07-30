import React from "react";

const Title2D = () => {
    return(
        <div className="videoWrapper fullvisual">
        <video className="video2D" autoPlay loop muted>
            <source src='/Assets/site/2d/2D.mp4' type='video/mp4'></source>
        </video>
        <div className="Head2D notosans bold">2D</div>
        </div>
        
    )
}

export default Title2D