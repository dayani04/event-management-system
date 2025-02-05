import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from './Carousel';
import About from './About';

import Services from './Services';
import Event from './Event';

const HomePage = () => {
    return (
        <>
     
          <Carousel />
          <About/>
          <Event/>
          <Services/>
    
        </>
      );
    }
    export default HomePage; 