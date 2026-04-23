import React from 'react';

const AboutPage = () => {
  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="fw-bold mb-4" style={{ color: 'var(--ms-primary)' }}>About Healthify Haat</h1>
          <p className="lead text-muted mb-4">
            Connecting organic farmers directly with health-conscious consumers across India.
          </p>
          <div className="text-start">
            <h4 className="fw-bold mt-5 mb-3">Our Mission</h4>
            <p className="text-muted">
              At Healthify Haat, we believe in the natural way of life. Our mission is to empower local farmers and provide families with access to 100% natural, chemical-free, and ethically sourced products.
            </p>
            <h4 className="fw-bold mt-5 mb-3">Why Choose Us?</h4>
            <ul className="text-muted list-unstyled">
              <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Farm to Table Authenticity</li>
              <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Fair Trade for Farmers</li>
              <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> 100% Organic & Chemical-Free</li>
              <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Eco-Friendly Packaging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
