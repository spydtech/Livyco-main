import React from 'react'
import Header from '../Header'
import Hero from './Hero'
import PopularCities from './PopularCities'
import TrendingPGs from './TrendingPGs'
import WhyChooseUs from './WhyChooseUs'
import AboutUs from './AboutUs'
import TestimonialCarousel from './TestimonialCarousel';
import Footer from '../../Clients-components/Footer'
import DownloadAppSection from './DownloadAppSection'
import Chatbot from '../chatbot/Chatbot';


const HomePage = props => {
    return (
        <>
            <Header />
            <Hero />
            <PopularCities />
            <TrendingPGs />
            <WhyChooseUs />
            <AboutUs />
            <TestimonialCarousel />
            <DownloadAppSection />
            <Chatbot />
            <Footer />

        </>
    )
}

export default HomePage