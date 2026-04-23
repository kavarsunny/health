import React from 'react';

const StoresPage = () => {
  const stores = [
    { city: 'Ahmedabad', address: '123 Natural Way, Bodakdev', phone: '+91 98765 43210' },
    { city: 'Gandhinagar', address: '45 Organic Lane, Sector 21', phone: '+91 98765 43211' },
    { city: 'Surat', address: '78 Wellness Road, Vesu', phone: '+91 98765 43212' }
  ];

  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: 'var(--ms-primary)' }}>Find Our Stores</h1>
        <p className="text-muted">Visit us in person to experience the freshness of our organic products.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {stores.map((store, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <i className="bi bi-shop fs-1" style={{ color: 'var(--ms-primary)' }}></i>
              </div>
              <h4 className="fw-bold mb-3">{store.city}</h4>
              <p className="text-muted mb-2">{store.address}</p>
              <p className="fw-bold text-dark">{store.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
