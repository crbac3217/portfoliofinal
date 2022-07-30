import React from "react"
import {HeaderNav} from '../components/HeaderNav.js'
import PostGame from "../components/PostGame.js";
import Footer from '../components/Footer.js'
import TitleGame from '../components/TitleGame.js'
import Part1Game from '../components/Part1Game.js'
import Part2Game from '../components/Part2Game.js'
import Part3Game from '../components/Part3Game.js'

const PageGame = () => {
return(
    <div>
    <HeaderNav />
    <div className="hideof">
    <TitleGame />
    <Part1Game />
    <Part2Game />
    <Part3Game />
    <PostGame />
    <Footer />
    </div>
    </div>
)
}

export default PageGame;