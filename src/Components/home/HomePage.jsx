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
            <Footer />

        </>
    )
}

export default HomePage