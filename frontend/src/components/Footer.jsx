import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>Note App</h2>
          <p>
            Keep your thoughts, ideas and notes organized in one place.
          </p>
        </div>

        <div className="footer-developer">
          <p>Designed & Developed by</p>
          <h3>Zishan Hoda Ansari</h3>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Note App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

