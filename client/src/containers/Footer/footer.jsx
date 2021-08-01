import React from 'react'
import { Link } from 'react-router-dom';

import './footer.css'


export default function Footer() {
    return (
        <div className="footer-container" >
            <footer className="footer-content">
                <div className="container upper-footer">

                    <div className="sm:flex sm:mt-8">
                        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 footer-categories">
                            <div className="footer-category">
                                <span className="footer-category-title">Account</span>
                                <span className="footer-category-item"><Link to="/MyProfile" className="footer-link">Your user account</Link></span>
                                <span className="footer-category-item"><Link to="/MyProfile/Edit" className="footer-link">Edit your account</Link></span>
                                <span className="footer-category-item"><Link to="/Order" className="footer-link">Your Orders</Link></span>
                            </div>
                            <div className="footer-category">
                                <span className="footer-category-title">About</span>
                                <span className="footer-category-item"><Link to="/About" className="footer-link">About us</Link></span>
                                <span className="footer-category-item"><Link to="/Terms" className="footer-link">Terms of use</Link></span>
                                <span className="footer-category-item"><Link to="/Privacy" className="footer-link">Privacy Policy</Link></span>
                            </div>
                            <div className="footer-category">
                                <span className="footer-category-title">Contact us</span>
                                <span className="footer-category-item"><a href="https://www.facebook.com/" className="footer-link">Facebook</a></span>
                                <span className="footer-category-item"><a href="https://www.twitter.com/" className="footer-link">Twitter</a></span>
                                <span className="footer-category-item"><a href="https://www.instagram.com/" className="footer-link">Instagram</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bottom-footer container">
                    <div className="copyright-container" >
                        <div className="copyright-text-container">
                            <p className="copyright-text">
                                © 2021 by HENRY STUDENTS
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}