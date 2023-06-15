import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './style';
import { Navbar, Login, Home, Footer } from './components';

const App = () => {
  return (
    <div className="bg-primary w-full h-screen overflow-hidden">

      <div className={`${styles.paddingX} ${styles.flexCenter} ${window.location.pathname === '/' ? 'hidden' : ''}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
        {/* <Route path="/Home" element={<Home />} /> */}
      {/* <Login /> */}

    
      {/* <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div> */}

      {/* <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
          <Footer />
          <Footer />
          <Footer />
        </div>
      </div> */}

    </div>
  )
}

export default App
