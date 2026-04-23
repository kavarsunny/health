import React from 'react';

const ContactPage = () => {
  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="fw-bold" style={{ color: 'var(--ms-primary)' }}>Contact Us</h1>
            <p className="text-muted">We'd love to hear from you. Please reach out with any questions or feedback.</p>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <form>
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email address</label>
                <input type="email" className="form-control" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Message</label>
                <textarea className="form-control" rows={5} placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary px-4 py-2 w-100 fw-bold">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
