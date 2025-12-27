import React from 'react'
import Navbar from '../Components/Navbar'
import MainPage from '../Components/MainPage'
import AboutUs from '../Components/AboutUs'
import SchoolToppers from '../Components/SchoolToppers'
import TamilThaiPlayer from '../Components/TamilThaiPlayer'
import Footer from '../Components/Footer'
import SchoolMap from '../Components/SchoolMap';

function Home() {
  return (
    <>
    <Navbar/>
    <br />
    <MainPage/>
    <AboutUs/>
    <SchoolToppers/>
    <SchoolMap />
    <Footer />

    </>
    )
}

export default Home