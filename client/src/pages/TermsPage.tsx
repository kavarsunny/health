import React from 'react';

const TermsPage = () => {
  return (
    <div className="container py-5" style={{ minHeight: '60vh', maxWidth: '800px' }}>
      <h1 className="fw-bold mb-4" style={{ color: 'var(--ms-primary)' }}>Terms of Service</h1>
      <p className="text-muted mb-5">Last updated: October 2026</p>
      
      <div className="text-muted">
        <h5 className="fw-bold text-dark mb-3">1. Agreement to Terms</h5>
        <p className="mb-4">
          These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Healthify Haat ("Company", “we”, “us”, or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
        </p>

        <h5 className="fw-bold text-dark mb-3">2. Intellectual Property Rights</h5>
        <p className="mb-4">
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
        </p>

        <h5 className="fw-bold text-dark mb-3">3. User Representations</h5>
        <p className="mb-4">
          By using the Site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
