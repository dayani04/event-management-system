import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from './Carousel';
import About from './About';
import Navbar from '../../Components/Navbar/Navbar';
import Services from './Services';
import Event from './Event';

const HomePage = () => {
    return (
        <>
     <Navbar/>
          <Carousel />
          <About/>
          <Event/>
          <Services/>
    
        </>
      );
    }
    export default HomePage; 