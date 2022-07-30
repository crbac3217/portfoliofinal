import React from "react"
import {HeaderNav} from '../components/HeaderNav.js'
import Contactpage from '../components/Contactpage.js'
import Footer from "../components/Footer.js"

const Contact = () => {
return(
    <div>
    <HeaderNav />
    <div className="hideof">
    <Contactpage />
    <Footer />
    </div>
    </div>
)
}

export default Contact;