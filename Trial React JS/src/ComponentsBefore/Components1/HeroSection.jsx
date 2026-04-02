import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                {/* Carousel Inner */}
                <div className="carousel-inner">

                    {/* Slide 1 */}
                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=600&fit=crop"
                            className="d-block w-100 carousel-image"
                            alt="Students in classroom"
                        />
                        <div className="carousel-overlay"></div>
                        <div className="carousel-caption-custom">
                            <h1 className="display-4 fw-bold mb-3">WelCome To InspireEdge School</h1>
                            <p className="lead mb-4">A Center of Educational Excellence and Holistic Development</p>
                            <button className="btn btn-primary btn-lg me-3">Apply for Admission</button>
                            <button className="btn btn-outline-light btn-lg">More Information</button>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop"
                            className="d-block w-100 carousel-image"
                            alt="School building"
                        />
                        <div className="carousel-overlay"></div>
                        <div className="carousel-caption-custom">
                            <h1 className="display-4 fw-bold mb-3">Modern Facilities</h1>
                            <p className="lead mb-4">State-of-the-art Labs, Library and Sports Facilities</p>
                            <button className="btn btn-primary btn-lg me-3">View Facilities</button>
                            <button className="btn btn-outline-light btn-lg">Contact Us</button>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop"
                            className="d-block w-100 carousel-image"
                            alt="Students learning"
                        />
                        <div className="carousel-overlay"></div>
                        <div className="carousel-caption-custom">
                            <h1 className="display-4 fw-bold mb-3">Excellent Teachers</h1>
                            <p className="lead mb-4">Quality Education by Experienced and Dedicated Faculty</p>
                            <button className="btn btn-primary btn-lg me-3">View Teachers</button>
                            <button className="btn btn-outline-light btn-lg">Results</button>
                        </div>
                    </div>

                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;