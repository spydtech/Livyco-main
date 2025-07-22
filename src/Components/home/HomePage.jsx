import React from 'react'
import Header from '../Header'
import Hero from './Hero'
import PopularCities from './PopularCities'

const HomePage = props => {
    return (
        <>
            <Header />
            <Hero />
            <PopularCities />
        </>
    )
}

export default HomePage