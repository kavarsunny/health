import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { clearError } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import AlertMessage from '../components/common/AlertMessage';
import Logo from '../components/common/Logo';
import * as authAPI from '../api/auth.api';

const FarmerRegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    infoSource: '',
    farmerType: '', // 'Individual Farmer' or 'FPO/Organization'

    // Address Info
    state: '',
    district: '',
    taluka: '',
    village: '',
    officeAddress: '',
    pincode: '',

    // Brand Info
    brandName: '',
    registrationType: '',
    website: '',
    gstNumber: '',
    yearlyTurnover: '',
    organicCert: '',
    fssaiCert: '',

    // Profile
    about: '',
    memberCount: '',
    achievements: '',

    // Password
    password: '',
    confirmPassword: ''
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.farmerType) {
      setLocalError('Please select farmer type');
      return;
    }
    if (step === 2 && (!formData.name || !formData.phone)) {
      setLocalError('Name and phone are required');
      return;
    }
    setLocalError('');
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await authAPI.registerFarmer(formData);
      navigate('/login');
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Registration failed');
    }
  };

  const renderStep1 = () => (
    <div>
      <h3>Select Farmer Type</h3>
      <div className="mb-3">
        <select
          name="farmerType"
          value={formData.farmerType}
          onChange={handleInputChange}
          required
          className="form-select"
        >
          <option value="">Select Type</option>
          <option value="Individual Farmer">Individual Farmer</option>
          <option value="FPO/Organization">FPO/FPC/Organization/Group</option>
        </select>
      </div>
      <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3>Basic Information</h3>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={formData.farmerType === 'Individual Farmer' ? 'Full Name' : 'Organization Name'}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Mobile Number"
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="tel"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleInputChange}
          placeholder="WhatsApp Number"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email (Optional)"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="infoSource"
          value={formData.infoSource}
          onChange={handleInputChange}
          placeholder="How did you get info about us? (Optional)"
          className="form-control"
        />
      </div>
      <button type="button" onClick={prevStep} className="btn btn-secondary me-2">Back</button>
      <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h3>Address Information</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <select name="state" value={formData.state} onChange={handleInputChange} required className="form-select">
            <option value="">Select State</option>
            <option value="Gujarat">Gujarat</option>
            {/* Add more states */}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <select name="district" value={formData.district} onChange={handleInputChange} required className="form-select">
            <option value="">Select District</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Gandhinagar">Gandhinagar</option>
            {/* Add more districts */}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <select name="taluka" value={formData.taluka} onChange={handleInputChange} required className="form-select">
            <option value="">Select Taluka</option>
            {/* Add talukas */}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <select name="village" value={formData.village} onChange={handleInputChange} required className="form-select">
            <option value="">Select Village</option>
            {/* Add villages */}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleInputChange}
          placeholder={formData.farmerType === 'Individual Farmer' ? 'Farm/Office Address' : 'Office Address'}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
          required
          className="form-control"
        />
      </div>
      <button type="button" onClick={prevStep} className="btn btn-secondary me-2">Back</button>
      <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <h3>Brand & Certification Information</h3>
      <div className="mb-3">
        <input
          type="text"
          name="brandName"
          value={formData.brandName}
          onChange={handleInputChange}
          placeholder="Brand Name"
          className="form-control"
        />
      </div>
      {formData.farmerType === 'FPO/Organization' && (
        <div className="mb-3">
          <select name="registrationType" value={formData.registrationType} onChange={handleInputChange} className="form-select">
            <option value="">Select Registration Type</option>
            <option value="FPO">FPO - Farmer Producer Organisation</option>
            <option value="FPC">FPC - Farmer Producer Company</option>
            <option value="FPG">FPG - Farmer Producer Group</option>
            <option value="SHG">SHG - Self Help Group</option>
            <option value="JLG">JLG - Joint Liability Group</option>
            <option value="NGO">NGO - Non-Governmental Organisation</option>
            <option value="Trust">Trust</option>
            <option value="Society">Society</option>
            <option value="Agri-Startup">Agri-Startup (DPIIT-Recognised)</option>
            <option value="MSME">MSME - Micro, Small & Medium Enterprise</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership">Partnership Firm</option>
            <option value="LLP">LLP - Limited Liability Partnership</option>
            <option value="Private Limited">Private Limited Company</option>
            <option value="Cooperative Society">Cooperative Society</option>
            <option value="MACS">MACS - Mutually Aided Cooperative Society</option>
            <option value="PACs">PACs - Primary Agricultural Credit Societies</option>
            <option value="Self">Self</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )}
      <div className="mb-3">
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          placeholder="Website (Optional)"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleInputChange}
          placeholder="GST Number (Optional)"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="yearlyTurnover"
          value={formData.yearlyTurnover}
          onChange={handleInputChange}
          placeholder="Yearly Turnover (Optional)"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <select name="organicCert" value={formData.organicCert} onChange={handleInputChange} className="form-select">
          <option value="">Organic Certificate</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="mb-3">
        <select name="fssaiCert" value={formData.fssaiCert} onChange={handleInputChange} className="form-select">
          <option value="">FSSAI Certificate</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <button type="button" onClick={prevStep} className="btn btn-secondary me-2">Back</button>
      <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );

  const renderStep5 = () => (
    <div>
      <h3>Profile Information</h3>
      <div className="mb-3">
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder={formData.farmerType === 'Individual Farmer' ? 'About Farmer' : 'About Organization/Group'}
          rows={3}
          className="form-control"
        />
      </div>
      {formData.farmerType === 'FPO/Organization' && (
        <div className="mb-3">
          <input
            type="number"
            name="memberCount"
            value={formData.memberCount}
            onChange={handleInputChange}
            placeholder="Number of Members in Organization/Group"
            className="form-control"
          />
        </div>
      )}
      <div className="mb-3">
        <textarea
          name="achievements"
          value={formData.achievements}
          onChange={handleInputChange}
          placeholder="Achievements (Optional)"
          rows={2}
          className="form-control"
        />
      </div>
      <button type="button" onClick={prevStep} className="btn btn-secondary me-2">Back</button>
      <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );

  const renderStep6 = () => (
    <div>
      <h3>Create Password</h3>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          minLength={6}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required
          className="form-control"
        />
      </div>
      <button type="button" onClick={prevStep} className="btn btn-secondary me-2">Back</button>
      <button type="submit" className="btn btn-success">Register</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div style={{
        width: '100%', maxWidth: 600,
        background: '#fff', borderRadius: 12, padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Logo width={150} />
          <h2>Farmer Registration</h2>
          <p>Step {step} of 6</p>
        </div>

        {(error || localError) && <AlertMessage variant="danger">{error || localError}</AlertMessage>}

        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegisterPage;