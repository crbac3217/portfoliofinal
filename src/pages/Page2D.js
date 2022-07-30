import React from "react"
import {HeaderNav} from '../components/HeaderNav.js'
import Post2D from "../components/Post2d.js";
import Footer from '../components/Footer.js'
import Title2D from '../components/Title2D.js'
import Part12D from '../components/Part12D.js'
import Part22D from '../components/Part22D.js'
import Part32D from '../components/Part32D.js'

const Page2D = () => {
return(
    <div>
    <HeaderNav />
    <div className="hideof">
    <Title2D />
    <Part12D />
    <Part22D />
    <Part32D />
    <Post2D />
    <Footer />
    </div>
    </div>
)
}

export default Page2D;