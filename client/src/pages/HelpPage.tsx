import React from 'react';

const HelpPage = () => {
  return (
    <div className="container py-5" style={{ minHeight: '60vh', maxWidth: '800px' }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: 'var(--ms-primary)' }}>Help & Support</h1>
        <p className="text-muted">Find answers to frequently asked questions.</p>
      </div>

      <div className="accordion" id="helpAccordion">
        <div className="accordion-item border-0 shadow-sm mb-3 rounded overflow-hidden">
          <h2 className="accordion-header">
            <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">
              How do I track my order?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#helpAccordion">
            <div className="accordion-body text-muted">
              You can track your order by logging into your account and visiting the "My Orders" section. Click on the specific order to view its current status and tracking details.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 shadow-sm mb-3 rounded overflow-hidden">
          <h2 className="accordion-header">
            <button className="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              What is the return policy?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
            <div className="accordion-body text-muted">
              Due to the perishable nature of our organic products, we generally do not accept returns. However, if an item arrives damaged or spoiled, please contact us within 24 hours of delivery for a replacement or refund.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 shadow-sm mb-3 rounded overflow-hidden">
          <h2 className="accordion-header">
            <button className="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
              How can I become a seller on Healthify Haat?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
            <div className="accordion-body text-muted">
              Farmers and producers can join us by clicking the "Sell" link in the navigation bar and submitting a farmer registration application. Our team will review your application and contact you for verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
