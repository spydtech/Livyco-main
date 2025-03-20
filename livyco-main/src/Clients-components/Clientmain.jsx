import React from 'react'
import PropertyListings from './PropertyListing'
import RecentlyListedProperties from './ListedProperties'
import Footer from './Footer'
import TestimonialCard from './TestimonialsCarousel '
import FaqSection from './FaqSection'

const Clientmain = () => {
    return (
        <>
            <div>
                <PropertyListings />
                <RecentlyListedProperties />
                <TestimonialCard />
                <FaqSection />
                <Footer />
            </div>
        </>
    )
}

export default Clientmain