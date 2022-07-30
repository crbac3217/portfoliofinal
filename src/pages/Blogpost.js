import React from "react"
import {HeaderNav} from '../components/HeaderNav.js'
import BlogpostMain from '../components/BlogpostMain.js'
import { useLocation } from "react-router-dom"
import queryString from 'query-string'
import Footer from "../components/Footer.js"

const Blogpost = () => {
    const { search } = useLocation()
    const {name} = queryString.parse(search);
    console.log(name)
return(
    <div>
    <HeaderNav />
    <div className="hideof">
    <BlogpostMain name={name} />
    <Footer />
    </div>
    </div>
)
}

export default Blogpost;