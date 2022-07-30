import React from "react";

const TitleGame = () => {
    return(
        <div className="videoWrapper fullvisual">
        <video className="video2D" autoPlay loop muted>
            <source src='/Assets/site/game/videoGame.mp4' type='video/mp4'></source>
        </video>
        <div className="HeadGame notosans bold">GAME</div>
        </div>
        
    )
}

export default TitleGame