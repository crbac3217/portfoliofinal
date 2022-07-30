import React from "react"
import {HeaderNav} from '../components/HeaderNav.js'
import Post3D from "../components/Post3d.js";
import Footer from '../components/Footer.js'
import Title3D from '../components/Title3D.js'
import Part13D from '../components/Part13D.js'
import Part23D from '../components/Part23D.js'
import Part33D from '../components/Part33D.js'

const Page3D = () => {
return(
    <div>
    <HeaderNav />
    <div className="hideof">
    <Title3D />
    <Part13D />
    <Part23D />
    <Part33D />
    <Post3D />
    <Footer />
    </div>
    </div>
)
}

export default Page3D;