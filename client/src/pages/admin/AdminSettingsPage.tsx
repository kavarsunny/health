import { useOutletContext } from 'react-router-dom';
import React from 'react';

const AdminSettingsPage = () => {
  const { toggleSidebar } = useOutletContext<any>() || {};
  return (
    <>
      <div className="ms-admin-topbar">
        <div className="ms-admin-topbar-left">
          <button className="btn btn-light d-none d-lg-flex align-items-center justify-content-center me-3" onClick={toggleSidebar} style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <i className="bi bi-list fs-5"></i>
          </button>
          <div>
            <h4>Store Settings</h4>
            <div className="ms-admin-breadcrumb">
              <a href="/">Store</a>
              <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
              <span style={{ color: '#4f46e5', fontWeight: 600 }}>Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ms-admin-main">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="ms-chart-card mb-4">
              <div className="ms-chart-header border-bottom pb-3 mb-3">
                <div className="ms-chart-title">General Preferences</div>
              </div>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Store Name</label>
                    <input type="text" className="form-control" defaultValue="Healthify Haat" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Support Email</label>
                    <input type="email" className="form-control" defaultValue="support@healthyhaat.com" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Store Address</label>
                    <textarea className="form-control" rows={3} defaultValue="123 Natural Way, Bodakdev, Ahmedabad"></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="button" className="ms-admin-btn-primary px-4 py-2">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>

            <div className="ms-chart-card">
              <div className="ms-chart-header border-bottom pb-3 mb-3">
                <div className="ms-chart-title">Payment & Checkout Settings</div>
              </div>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="codSwitch" defaultChecked />
                <label className="form-check-label fw-bold" htmlFor="codSwitch">Enable Cash on Delivery (COD)</label>
                <div className="form-text">Allow customers to pay upon receiving their orders.</div>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="taxSwitch" defaultChecked />
                <label className="form-check-label fw-bold" htmlFor="taxSwitch">Include taxes in prices</label>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
             <div className="ms-chart-card bg-light">
               <div className="ms-chart-title mb-3">System Info</div>
               <ul className="list-unstyled mb-0">
                 <li className="mb-2 text-muted"><strong>Version:</strong> 1.0.0</li>
                 <li className="mb-2 text-muted"><strong>Environment:</strong> Production</li>
                 <li className="text-muted"><strong>Database:</strong> Connected</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettingsPage;
