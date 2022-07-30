import React from "react"
import {HeaderNav} from '../components/HeaderNav.js'
import PostTitle from "../components/PostTitle.js"
import PostList from "../components/PostList.js"
import Footer from "../components/Footer.js"

const Posts = () => {
return(
    <div>
    <HeaderNav />
    <div className="hideof">
    <PostTitle />
    <PostList />
    <Footer />
    </div>
    </div>
)
}

export default Posts;