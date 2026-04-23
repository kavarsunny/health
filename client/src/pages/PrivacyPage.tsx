import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container py-5" style={{ minHeight: '60vh', maxWidth: '800px' }}>
      <h1 className="fw-bold mb-4" style={{ color: 'var(--ms-primary)' }}>Privacy Policy</h1>
      <p className="text-muted mb-5">Last updated: October 2026</p>
      
      <div className="text-muted">
        <h5 className="fw-bold text-dark mb-3">1. Information We Collect</h5>
        <p className="mb-4">
          We collect personal information that you provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
        </p>

        <h5 className="fw-bold text-dark mb-3">2. How We Use Your Information</h5>
        <p className="mb-4">
          We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>

        <h5 className="fw-bold text-dark mb-3">3. Data Security</h5>
        <p className="mb-4">
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
