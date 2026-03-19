import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} BookStore | Built by <span className="author-name">Ahmed Ashraf</span></p>
        <div className="footer-links">
          <a 
            href="https://www.linkedin.com/in/ahmed-ashraf-40a4b6353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
