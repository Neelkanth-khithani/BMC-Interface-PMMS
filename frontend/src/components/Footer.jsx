import React from 'react';

function Footer() {
  return (
    <div style={{backgroundColor: "#3B6790", color: "#fff"}}>
      <footer className="py-3">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">Home</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">Features</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">Pricing</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">FAQs</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">About</a>
          </li>
        </ul>
        <p className="text-center">© 2025 PMMS, BMC</p>
      </footer>
    </div>
  );
}

export default Footer;
