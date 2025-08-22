import React from 'react';
import '../pageStyles/AboutUs.css';

import nature from '../assets/nature-is-good-seal.webp';
import natureis from '../assets/nature-is.webp';
import shortcut from '../assets/no-shortcuts.webp';
import leafIcon from '../assets/leaf-icon.png';
import RedVeg from '../assets/redveg.webp';
import Orra from '../assets/logo.png';
import juiceOrange from '../assets/juice.webp';
import stampOrra from '../assets/orrastamp.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import DS from '../assets/dssir.jpg';

const AboutUs = () => {
    return (
        <div className='space'>
            <Navbar />
            <div className="about-us-wrapper">
                <section className="top-section">
                    <img src={leafIcon} className="top-deco left" alt="fruit1" />
                    <img src={RedVeg} className="top-deco right" alt="fruit2" />
                    <div className="center-content">
                        <img src={Orra} alt="Orra" className='Orra' />
                        <h2>Orra-Modern Ayurvedic Nutrition</h2>
                        <p>We’re with you to help you live consciously, in synergy with Mother nature.</p>
                    </div>
                </section>

                {/* .........dusynt sir ................ */}
                <section className="top-sectionds">
                    <img src={DS} className="top-decods" alt="fruit2" />
                    <div className="center-contentds">
                        <h2>🌿 About Dr. Dushyant – <br />Ayurvedic Master & Wellness Guide</h2>
                        <p>"Healing is not just about removing pain; it is about restoring balance, reconnecting with nature, and listening to the body’s silent wisdom." — <br /><strong>Dr. Dushyant</strong></p>
                        <p>I am <strong>Dr. Dushyant</strong>, a lifelong student and teacher of Ayurveda — the ancient science of life. For over two decades, I have walked the path of natural healing, combining time-tested Vedic wisdom with modern-day understanding to help people rediscover harmony within.</p>
                        <p>At <strong> ORRAHEALTHYCURE</strong>, my mission is simple:
To empower every individual to take charge of their health through the purity of herbs, the rhythm of nature, and the stillness of mind.</p>
                    </div>
                </section>
                {/* ...................... */}


                <section className="info-section">
                    <h5 className='about'>ABOUT US</h5>
                    <p className="about-text">
                        Orra’s tri-dosha synergy is an ever-growing family of Ayurvedic experts, nutritionists, food scientists,
                        and curious minds like you.
                    </p>
                    <div className="cards-container">
                        <div className="info-card pink">
                            <div className="icon rotating"><img src={natureis} alt="icon1" /></div>
                            <h4>Natural is good</h4>
                            <p>Orra ensures all products are natural and organic.</p>
                        </div>
                        <div className="info-card mint">
                            <div className="icon rotating"><img src={nature} alt="icon2" /></div>
                            <h4>Here for your health</h4>
                            <p>Crafted with Ayurvedic knowledge and backed by science.</p>
                        </div>
                        <div className="info-card yellow">
                            <div className="icon rotating"><img src={shortcut} alt="icon3" /></div>
                            <h4>No shortcuts</h4>
                            <p>Orra products are sourced in their purest form.</p>
                        </div>
                    </div>
                </section>

                <section className="philosophy-section">
                    <div className="philosophy-content">
                        <h6>OUR PHILOSOPHY</h6>
                        <h3>Your simple guide to everyday Ayurveda</h3>
                        <p>
                            Orra understands your worries, which is why we’ve stripped the complexity and crafted fresh,
                            pure, and honest Ayurveda.
                        </p>
                    </div>
                    <img src={juiceOrange} className="bottom-deco juice" alt="juice" />
                    <img src={stampOrra} className="bottom-deco orange" alt="orange" />
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
