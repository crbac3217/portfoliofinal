import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blogpost from '../pages/Blogpost.js';
import Posts from '../pages/Posts.js';
import Contact from '../pages/Contact.js';
import Page2D from '../pages/Page2D.js';
import Page3D from '../pages/Page3D.js';
import PageGame from '../pages/PageGame';
import Mainscreen from '../pages/MainScreen.js';

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={ <Mainscreen /> } />
      <Route path="Contact" element={ <Contact/> } />
      <Route path="2D" element = {<Page2D />} />
      <Route path="3D" element = {<Page3D />} />
      <Route path="Game" element = {<PageGame />} />
      <Route path="Posts" element = {<Posts />} />
      <Route path="getBlogPost" element = {<Blogpost />} />
    </Routes>
  );
}

export default Main