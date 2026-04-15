import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RentLeadflow.css";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";  


// ✅ GLOBAL HELPERS (accessible everywhere)
const formatToUSDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
};

const parseToISODate = (value) => {
  const [month, day, year] = value.split("-");
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

const AddressStep = ({ formData, errors, updateFormData, nextStep }) => (
  <div className="wizard-step fade-in address-step">
    <div className="step-header">
      <span className="step-number">1</span>
      <h2>Property Address</h2>
      <p>Enter the address of the property you want to rent out</p>
    </div>

    <div className="address-hero">
      <div className="address-input-wrapper">
        <input
          type="text"
          className={`address-input ${errors.address ? 'error' : ''}`}
          placeholder="Enter property address (e.g., 123 Main St, City, State)"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && nextStep()}
        />
        <button 
          className="next-btn" 
          onClick={nextStep}
          disabled={!formData.address.trim()}
        >
          Next
        </button>
      </div>
      
      {errors.address && <div className="error-message">{errors.address}</div>}
      
      <p className="input-hint">We'll use this to find comparable rentals in your area</p>
      
      <div className="address-features">
        <div className="feature-item">
          <span className="feature-icon">🏠</span>
          <span>Professional Analysis</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💰</span>
          <span>Market Insights</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📊</span>
          <span>Free Consultation</span>
        </div>
      </div>
    </div>
  </div>
);

const PropertyDetailsStep = ({ formData, errors, updateFormData, nextStep, prevStep }) => (
  <div className="wizard-step fade-in">
    <div className="step-header">
      <span className="step-number">2</span>
      <h2>Property Details</h2>
      <p>Tell us about your rental property</p>
    </div>

    <div className="details-grid">
      <div className="detail-input-group">
        <label>Property Type</label>
        <select
          className={`detail-input ${errors.propertyType ? 'error' : ''}`}
          value={formData.propertyType}
          onChange={(e) => updateFormData('propertyType', e.target.value)}
        >
          <option value="">Select type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="studio">Studio</option>
          <option value="duplex">Duplex</option>
        </select>
        {errors.propertyType && <div className="error-message">{errors.propertyType}</div>}
      </div>

      <div className="detail-input-group">
        <label>Bedrooms</label>
        <select
          className={`detail-input ${errors.bedrooms ? 'error' : ''}`}
          value={formData.bedrooms}
          onChange={(e) => updateFormData('bedrooms', e.target.value)}
        >
          <option value="">Select</option>
          <option value="studio">Studio</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          <option value="5+">5+ Bedrooms</option>
        </select>
        {errors.bedrooms && <div className="error-message">{errors.bedrooms}</div>}
      </div>

      <div className="detail-input-group">
        <label>Bathrooms</label>
        <select
          className={`detail-input ${errors.bathrooms ? 'error' : ''}`}
          value={formData.bathrooms}
          onChange={(e) => updateFormData('bathrooms', e.target.value)}
        >
          <option value="">Select</option>
          <option value="1">1 Bathroom</option>
          <option value="1.5">1.5 Bathrooms</option>
          <option value="2">2 Bathrooms</option>
          <option value="2.5">2.5 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="3.5">3.5 Bathrooms</option>
          <option value="4+">4+ Bathrooms</option>
        </select>
        {errors.bathrooms && <div className="error-message">{errors.bathrooms}</div>}
      </div>

      <div className="detail-input-group">
        <label>Square Feet</label>
        <input
          type="number"
          className="detail-input"
          placeholder="e.g., 1200"
          value={formData.squareFeet}
          onChange={(e) => updateFormData('squareFeet', e.target.value)}
        />
      </div>

      <div className="detail-input-group">
        <label>Furnished</label>
        <select
          className="detail-input"
          value={formData.furnished}
          onChange={(e) => updateFormData('furnished', e.target.value)}
        >
          <option value="">Select</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="partially">Partially Furnished</option>
        </select>
      </div>

      <div className="detail-input-group">
        <label>Pets Allowed</label>
        <select
          className="detail-input"
          value={formData.petsAllowed}
          onChange={(e) => updateFormData('petsAllowed', e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="case-by-case">Case by Case</option>
        </select>
      </div>

      <div className="detail-input-group">
        <label>Available Date</label>

{/* Visible Input (US Format) */}
<input
  type="text"
  placeholder="MM-DD-YYYY"
  className={`detail-input ${errors.availableDate ? 'error' : ''}`}
  value={formatToUSDate(formData.availableDate)}
  readOnly
  onClick={() => document.getElementById("availableDatePicker").showPicker()}
/>

{/* Hidden Real Date Picker */}
<input
  id="availableDatePicker"
  type="date"
  value={formData.availableDate}
  onChange={(e) => updateFormData("availableDate", e.target.value)}
  style={{
    position: "absolute",
    opacity: 0,
    pointerEvents: "none"
  }}
/>

        {errors.availableDate && <div className="error-message">{errors.availableDate}</div>}
      </div>
    </div>

    <div className="wizard-actions">
      <button className="back-btn" onClick={prevStep}>Back</button>
      <button className="next-btn" onClick={nextStep}>Next</button>
    </div>
  </div>
);

const RentalExpectationsStep = ({ formData, errors, updateFormData, nextStep, prevStep }) => (
  <div className="wizard-step fade-in">
    <div className="step-header">
      <span className="step-number">3</span>
      <h2>Rental Expectations</h2>
      <p>Help us understand your rental goals</p>
    </div>

    <div className="details-grid">
      <div className="detail-input-group">
        <label>Expected Monthly Rent ($)</label>
        <div className="input-with-prefix">
          <span className="prefix">$</span>
          <input
            type="number"
            className={`detail-input ${errors.expectedRent ? 'error' : ''}`}
            placeholder="2,500"
            value={formData.expectedRent}
            onChange={(e) => updateFormData('expectedRent', e.target.value)}
          />
        </div>
        {errors.expectedRent && <div className="error-message">{errors.expectedRent}</div>}
      </div>

      <div className="detail-input-group">
        <label>Preferred Lease Duration</label>
        <select
          className={`detail-input ${errors.leaseDuration ? 'error' : ''}`}
          value={formData.leaseDuration}
          onChange={(e) => updateFormData('leaseDuration', e.target.value)}
        >
          <option value="">Select duration</option>
          <option value="6-month">6 Months</option>
          <option value="12-month">12 Months</option>
          <option value="18-month">18 Months</option>
          <option value="24-month">24 Months</option>
          <option value="month-to-month">Month-to-Month</option>
          <option value="flexible">Flexible</option>
        </select>
        {errors.leaseDuration && <div className="error-message">{errors.leaseDuration}</div>}
      </div>
    </div>

    <div className="details-grid">
      <div className="detail-input-group">
        <label>Current Occupancy</label>
        <select
          className={`detail-input ${errors.currentOccupancy ? 'error' : ''}`}
          value={formData.currentOccupancy}
          onChange={(e) => updateFormData('currentOccupancy', e.target.value)}
        >
          <option value="">Select status</option>
          <option value="vacant">Vacant</option>
          <option value="owner-occupied">Owner Occupied</option>
          <option value="tenant-occupied">Tenant Occupied</option>
        </select>
        {errors.currentOccupancy && <div className="error-message">{errors.currentOccupancy}</div>}
      </div>
    </div>

    <div className="wizard-actions">
      <button className="back-btn" onClick={prevStep}>Back</button>
      <button className="next-btn" onClick={nextStep}>Next</button>
    </div>
  </div>
);

const LandlordInfoStep = ({ formData, errors, updateFormData, nextStep, prevStep }) => (
  <div className="wizard-step fade-in">
    <div className="step-header">
      <span className="step-number">4</span>
      <h2>Your Information</h2>
      <p>How can our team reach you?</p>
    </div>

    <div className="lead-form">
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Best Time to Contact</label>
          <select
            className="form-input"
            value={formData.bestTime}
            onChange={(e) => updateFormData('bestTime', e.target.value)}
          >
            <option value="">Select time</option>
            <option value="morning">Morning (8am - 12pm)</option>
            <option value="afternoon">Afternoon (12pm - 5pm)</option>
            <option value="evening">Evening (5pm - 8pm)</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea
          className="form-textarea"
          placeholder="Tell us about any special features, concerns, or requirements..."
          rows="3"
          value={formData.specialFeatures}
          onChange={(e) => updateFormData('specialFeatures', e.target.value)}
        />
      </div>
    </div>

    <div className="privacy-note">
      <p>🔒 Your information is kept confidential. By submitting, you agree to be contacted by our leasing team.</p>
    </div>

    <div className="wizard-actions">
      <button className="back-btn" onClick={prevStep}>Back</button>
      <button className="next-btn submit-final" onClick={nextStep}>Next</button>
    </div>
  </div>
);

const ReviewStep = ({ formData, handleSubmit, prevStep, isSubmitting, formatCurrency }) => {
  const estimatedCommission = formData.expectedRent * 12 * 0.06; // 6% of annual rent
  const grandviewFee = formData.expectedRent * 12 * 0.04; // 4% management fee
  const annualSavings = estimatedCommission - grandviewFee;

  return (
    <div className="wizard-step fade-in">
      <div className="step-header">
        <span className="step-number">5</span>
        <h2>Review & Submit</h2>
        <p>Review your information before submitting</p>
      </div>

      <div className="review-summary">
        <h3>Property Summary</h3>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Address</span>
            <span className="review-value">{formData.address}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Property Type</span>
            <span className="review-value">{formData.propertyType}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Bedrooms</span>
            <span className="review-value">{formData.bedrooms}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Bathrooms</span>
            <span className="review-value">{formData.bathrooms}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Expected Rent</span>
            <span className="review-value">{formatCurrency(formData.expectedRent)}/month</span>
          </div>
          <div className="review-item">
            <span className="review-label">Available Date</span>
            {/* <span className="review-value">{formData.availableDate}</span> */}
            <span className="review-value">
  {formatToUSDate(formData.availableDate)}
</span>
          </div>
        </div>
      </div>

      <div className="value-proposition">
        <h3>Why Choose Grandview for Your Rental?</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🏠</div>
            <h4>Professional Marketing</h4>
            <p>Professional photography, virtual tours, and premium listings on all major platforms</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👥</div>
            <h4>Tenant Screening</h4>
            <p>Comprehensive background, credit, and employment verification</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h4>Rent Collection</h4>
            <p>Online payment processing and timely deposit to your account</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔧</div>
            <h4>Maintenance Coordination</h4>
            <p>24/7 emergency response and trusted vendor network</p>
          </div>
        </div>
      </div>

      <div className="wizard-actions">
        <button className="back-btn" onClick={prevStep}>Back</button>
        <button 
          className="next-btn submit-final" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
};

const SuccessStep = ({ formData, navigate, formatCurrency }) => (
  <div className="success-state fade-in">
    <div className="success-checkmark">
      <svg viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="25" fill="none" />
        <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>
    <h2>Thank You!</h2>
    <p>Your rental property information has been submitted successfully.</p>
    
    <div className="success-details">
      <p><strong>Property:</strong> {formData.address}</p>
      <p><strong>Expected Rent:</strong> {formatCurrency(formData.expectedRent)}/month</p>
      {/* <p><strong>Available:</strong> {formData.availableDate}</p> */}
      <p><strong>Available:</strong> {formatToUSDate(formData.availableDate)}</p>
    </div>

    <div className="next-steps">
      <h3>What Happens Next?</h3>
      <ol>
        <li>Our leasing specialist will review your property details</li>
        <li>We'll contact you within 24 hours to discuss your goals</li>
        <li>Schedule a property consultation and market analysis</li>
        <li>Receive a customized rental strategy and marketing plan</li>
      </ol>
    </div>

    <div className="wizard-actions" style={{justifyContent: 'center', gap: '20px'}}>
      <button className="back-btn" onClick={() => navigate('/')}>Return Home</button>
      <button className="next-btn" onClick={() => navigate('/contact')}>Contact Us</button>
    </div>
  </div>
);

function RentLeadFlow() {
  // Add this helper function:
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [currentStep, setCurrentStep] = useState(() => loadFromStorage('rentLeadCurrentStep', 1));
  const [formData, setFormData] = useState(() => loadFromStorage('rentLeadFormData', {
    // Step 1: Property Address
    address: "",
    
    // Step 2: Property Details
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    furnished: "",
    petsAllowed: "",
    availableDate: "",
    
    // Step 3: Rental Expectations
    expectedRent: "",
    leaseDuration: "",
    
    // Step 4: Landlord Information
    name: "",
    email: "",
    phone: "",
    currentOccupancy: "",
    
    // Step 5: Additional Details
    specialFeatures: "",
    utilitiesIncluded: [],
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  // Add this new state:
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  // Add this useEffect:
  useEffect(() => {
    try {
      localStorage.setItem('rentLeadFormData', JSON.stringify(formData));
      localStorage.setItem('rentLeadCurrentStep', JSON.stringify(currentStep));
      setShowSavedIndicator(true);
      const timer = setTimeout(() => setShowSavedIndicator(false), 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  }, [formData, currentStep]);

  const totalSteps = 5;

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.address.trim()) {
          newErrors.address = "Property address is required";
        }
        break;
      case 2:
        if (!formData.propertyType) {
          newErrors.propertyType = "Please select a property type";
        }
        if (!formData.bedrooms) {
          newErrors.bedrooms = "Please select number of bedrooms";
        }
        if (!formData.bathrooms) {
          newErrors.bathrooms = "Please select number of bathrooms";
        }
        if (!formData.availableDate) {
          newErrors.availableDate = "Please select an available date";
        }
        break;
      case 3:
        if (!formData.expectedRent) {
          newErrors.expectedRent = "Please enter expected monthly rent";
        } else if (isNaN(formData.expectedRent) || formData.expectedRent <= 0) {
          newErrors.expectedRent = "Please enter a valid rent amount";
        }
        if (!formData.leaseDuration) {
          newErrors.leaseDuration = "Please select a lease duration";
        }
        break;
      case 4:
        if (!formData.name.trim()) {
          newErrors.name = "Your name is required";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        }
        if (!formData.currentOccupancy) {
          newErrors.currentOccupancy = "Please select occupancy status";
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

const handleSubmit = async () => {
  if (validateStep(currentStep) && !isSubmitting && !isComplete) {
    setIsSubmitting(true);

    const { error } = await supabase.from("rent_leads").insert([
      {
        address: formData.address,
        property_type: formData.propertyType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        square_feet: formData.squareFeet,
        furnished: formData.furnished,
        pets_allowed: formData.petsAllowed,
        available_date: formData.availableDate,
        expected_rent: formData.expectedRent,
        lease_duration: formData.leaseDuration,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        current_occupancy: formData.currentOccupancy,
        special_features: formData.specialFeatures,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Something went wrong");
      setIsSubmitting(false);
    } else {
      // Clear draft data on successful submission
      localStorage.removeItem('rentLeadFormData');
      localStorage.removeItem('rentLeadCurrentStep');
      setIsComplete(true);
      setIsSubmitting(false);
    }
  }
};

// Convert YYYY-MM-DD → MM-DD-YYYY (for display)
const formatToUSDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
};

// Convert MM-DD-YYYY → YYYY-MM-DD (for storage)
const parseToISODate = (value) => {
  const [month, day, year] = value.split("-");
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Auto format while typing (MM-DD-YYYY)
const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isComplete) {
    return (
      <div className="rent-lead-flow-page">
        <div className="wizard-container">
          <SuccessStep formData={formData} navigate={navigate} formatCurrency={formatCurrency} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="rent-lead-flow-page">
      <div className="wizard-container">
        <div className="wizard-header">
          <h1>Rent Your Property</h1>
          <p>Get started with Grandview Property Management. Complete this quick form to receive a free rental analysis.</p>
          {showSavedIndicator && (
            <div className="saved-indicator" style={{
              color: '#28a745',
              fontSize: '14px',
              marginTop: '10px',
              opacity: showSavedIndicator ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}>
              ✓ Draft saved
            </div>
          )}
        </div>

        <div className="progress-indicator">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`progress-step ${
                step < currentStep ? 'completed' : 
                step === currentStep ? 'active' : ''
              }`}
            >
              <div className="progress-circle">
                {step < currentStep ? '✓' : step}
              </div>
              <span className="progress-label">
                {step === 1 ? 'Address' : 
                 step === 2 ? 'Details' : 
                 step === 3 ? 'Expectations' :
                 step === 4 ? 'Info' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        <div className="wizard-content">
          {currentStep === 1 && <AddressStep formData={formData} errors={errors} updateFormData={updateFormData} nextStep={nextStep} />}
          {currentStep === 2 && <PropertyDetailsStep formData={formData} errors={errors} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 3 && <RentalExpectationsStep formData={formData} errors={errors} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 4 && <LandlordInfoStep formData={formData} errors={errors} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 5 && <ReviewStep formData={formData} handleSubmit={handleSubmit} prevStep={prevStep} isSubmitting={isSubmitting} formatCurrency={formatCurrency} />}
        </div>

        

        <div className="wizard-footer">
          <p>Questions? <a href="/contact">Contact our leasing team</a></p>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default RentLeadFlow;