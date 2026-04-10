import React, { useState, useEffect } from "react";
import "../styles/sellerleadflow.css";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

// Step 1: Address Input Component
const AddressStep = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formData.address.trim()) {
        onNext();
      }
    }
  };

  /* 
   * TODO: Google Places Autocomplete Integration
   * 
   * To integrate Google Places Autocomplete:
   * 1. Install @react-google-maps/api: npm install @react-google-maps/api
   * 2. Import useLoadScript and Autocomplete from the library
   * 3. Wrap this component with Google Maps script loader
   * 4. Replace the input with Autocomplete component
   * 5. Handle place_changed event to get full address details
   * 
   * Example:
   * const { isLoaded } = useLoadScript({
   *   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
   *   libraries: ["places"]
   * });
   * 
   * const onLoad = (autocomplete) => {
   *   autocomplete.addListener('place_changed', () => {
   *     const place = autocomplete.getPlace();
   *     setFormData(prev => ({
   *       ...prev,
   *       address: place.formatted_address,
   *       lat: place.geometry?.location?.lat(),
   *       lng: place.geometry?.location?.lng()
   *     }));
   *   });
   * };
   */

  return (
    <div className="wizard-step address-step">
      <div className="step-header">
        <span className="step-number">1</span>
        <h2>What's your property address?</h2>
        <p>We'll analyze recent sales and market trends in your area.</p>
      </div>

      <div className="address-hero">
        <div className="address-input-wrapper">
          <input
            type="text"
            className="address-input"
            placeholder="Enter your property address..."
            value={formData.address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            className="next-btn"
            onClick={onNext}
            disabled={!formData.address.trim()}
          >
            Get Started →
          </button>
        </div>

        <p className="input-hint">Press Enter or click the button to continue</p>
        
        <div className="address-features">
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Free Analysis</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <span>1% Listing Fee</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>Fast Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Property Details Component
const PropertyDetailsStep = ({ formData, setFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleConditionSelect = (condition) => {
    setFormData((prev) => ({
      ...prev,
      condition,
    }));
    if (errors.condition) {
      setErrors((prev) => ({ ...prev, condition: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.beds || formData.beds <= 0) {
      newErrors.beds = "Please enter a valid number of bedrooms";
    }
    if (!formData.baths || formData.baths <= 0) {
      newErrors.baths = "Please enter a valid number of bathrooms";
    }
    if (!formData.sqft || formData.sqft <= 0) {
      newErrors.sqft = "Please enter a valid square footage";
    }
    if (!formData.condition) {
      newErrors.condition = "Please select a property condition";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  const conditions = [
    { id: "tlc", label: "Needs TLC", description: "Requires repairs or updates" },
    { id: "move-in", label: "Move-In Ready", description: "Good condition, no major work needed" },
    { id: "renovated", label: "Recently Renovated", description: "Updated kitchen, baths, or systems" },
  ];

  return (
    <div className="wizard-step">
      <div className="step-header">
        <span className="step-number">2</span>
        <h2>Tell us about your property</h2>
        <p>This information helps us provide an accurate market analysis.</p>
      </div>

      <div className="details-grid">
        <div className="detail-input-group">
          <label>Bedrooms</label>
          <input
            type="number"
            name="beds"
            min="1"
            max="10"
            value={formData.beds}
            onChange={handleChange}
            placeholder="e.g., 3"
            className={errors.beds ? "error" : ""}
          />
          {errors.beds && <span className="error-message">{errors.beds}</span>}
        </div>

        <div className="detail-input-group">
          <label>Bathrooms</label>
          <input
            type="number"
            name="baths"
            min="1"
            max="8"
            step="0.5"
            value={formData.baths}
            onChange={handleChange}
            placeholder="e.g., 2"
            className={errors.baths ? "error" : ""}
          />
          {errors.baths && <span className="error-message">{errors.baths}</span>}
        </div>

        <div className="detail-input-group">
          <label>Square Footage</label>
          <input
            type="number"
            name="sqft"
            min="500"
            max="10000"
            value={formData.sqft}
            onChange={handleChange}
            placeholder="e.g., 2000"
            className={errors.sqft ? "error" : ""}
          />
          {errors.sqft && <span className="error-message">{errors.sqft}</span>}
        </div>
      </div>

      <div className="condition-section">
        <label>Property Condition</label>
        <div className="condition-toggles">
          {conditions.map((c) => (
            <div
              key={c.id}
              className={`condition-card ${formData.condition === c.id ? "selected" : ""} ${errors.condition ? "error" : ""}`}
              onClick={() => handleConditionSelect(c.id)}
            >
              <div className="condition-label">{c.label}</div>
              <div className="condition-desc">{c.description}</div>
            </div>
          ))}
        </div>
        {errors.condition && <span className="error-message">{errors.condition}</span>}
      </div>

      <div className="wizard-actions">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="next-btn" onClick={handleSubmit}>Continue →</button>
      </div>
    </div>
  );
};

// Step 3: CMA Teaser Component
const CMATeaserStep = ({ formData, onNext, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Simulate data fetch with 2-second loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Small delay before showing result for smooth transition
      setTimeout(() => setShowResult(true), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Generate a dummy price range based on property details
  const generatePriceRange = () => {
    const basePrice = formData.sqft * 175; // Base calculation
    const low = Math.round(basePrice * 0.9 / 1000) * 1000;
    const high = Math.round(basePrice * 1.1 / 1000) * 1000;
    return { low, high };
  };

  const priceRange = generatePriceRange();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="wizard-step">
        <div className="step-header">
          <span className="step-number">3</span>
          <h2>Analyzing your property...</h2>
        </div>

        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Analyzing local market data...</p>
          <p className="loading-subtext">Comparing recent sales, active listings, and market trends</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`wizard-step ${showResult ? "fade-in" : ""}`}>
      <div className="step-header">
        <span className="step-number">3</span>
        <h2>Market Analysis Complete!</h2>
      </div>

      <div className="cma-result">
        <div className="success-icon">✓</div>
        <h3>Great news about your area!</h3>
        <p className="cma-intro">
          Based on our analysis of recent sales and current market conditions in your area:
        </p>

        <div className="price-range-display">
          <div className="price-label">Homes like yours are selling between</div>
          <div className="price-values">
            <span className="price-low">{formatPrice(priceRange.low)}</span>
            <span className="price-separator">and</span>
            <span className="price-high">{formatPrice(priceRange.high)}</span>
          </div>
        </div>

        <p className="cma-note">
          *This is an estimated range based on comparable properties. Get your personalized valuation and net proceeds calculation below.
        </p>
      </div>

      <div className="wizard-actions">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="next-btn" onClick={onNext}>
          Calculate Your Net Proceeds →
        </button>
      </div>
    </div>
  );
};

// Step 4: Seller Net Sheet Calculator Component
const NetSheetCalculator = ({ formData, setFormData, onNext, onBack }) => {
  const [homeValue, setHomeValue] = useState(formData.estimatedValue || 500000);
  const [mortgageBalance, setMortgageBalance] = useState(formData.mortgageBalance || 250000);

  // Fee percentages
  const FEES = {
    buyerAgent: 0.025, // 2.5%
    titleEscrow: 0.015, // 1.5%
    grandviewListing: 0.01, // 1% (Grandview's competitive rate)
    traditionalListing: 0.03, // 3% (Traditional rate)
  };

  // Calculate expenses for Grandview model
  const calculateGrandviewNet = () => {
    const salePrice = homeValue;
    const buyerAgentFee = salePrice * FEES.buyerAgent;
    const titleEscrow = salePrice * FEES.titleEscrow;
    const listingFee = salePrice * FEES.grandviewListing;
    const totalExpenses = buyerAgentFee + titleEscrow + listingFee + mortgageBalance;
    return {
      buyerAgentFee,
      titleEscrow,
      listingFee,
      totalExpenses,
      netProceeds: salePrice - totalExpenses,
    };
  };

  // Calculate expenses for Traditional model
  const calculateTraditionalNet = () => {
    const salePrice = homeValue;
    const buyerAgentFee = salePrice * FEES.buyerAgent;
    const titleEscrow = salePrice * FEES.titleEscrow;
    const listingFee = salePrice * FEES.traditionalListing;
    const totalExpenses = buyerAgentFee + titleEscrow + listingFee + mortgageBalance;
    return {
      buyerAgentFee,
      titleEscrow,
      listingFee,
      totalExpenses,
      netProceeds: salePrice - totalExpenses,
    };
  };

  const grandview = calculateGrandviewNet();
  const traditional = calculateTraditionalNet();
  const savings = traditional.netProceeds < grandview.netProceeds 
    ? grandview.netProceeds - traditional.netProceeds 
    : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleHomeValueChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setHomeValue(value);
    setFormData((prev) => ({ ...prev, estimatedValue: value }));
  };

  const handleMortgageChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setMortgageBalance(value);
    setFormData((prev) => ({ ...prev, mortgageBalance: value }));
  };

  return (
    <div className="wizard-step">
      <div className="step-header">
        <span className="step-number">4</span>
        <h2>Seller Net Sheet Calculator</h2>
        <p>See exactly how much you'll walk away with at closing.</p>
      </div>

      <div className="calculator-inputs">
        <div className="calc-input-group">
          <label>Estimated Home Value</label>
          <div className="input-with-prefix">
            <span className="prefix">$</span>
            <input
              type="number"
              value={homeValue}
              onChange={handleHomeValueChange}
              min="0"
              step="1000"
            />
          </div>
          <input
            type="range"
            min="100000"
            max="2000000"
            step="5000"
            value={homeValue}
            onChange={handleHomeValueChange}
            className="slider"
          />
        </div>

        <div className="calc-input-group">
          <label>Remaining Mortgage Balance</label>
          <div className="input-with-prefix">
            <span className="prefix">$</span>
            <input
              type="number"
              value={mortgageBalance}
              onChange={handleMortgageChange}
              min="0"
              step="1000"
            />
          </div>
          <input
            type="range"
            min="0"
            max="2000000"
            step="5000"
            value={mortgageBalance}
            onChange={handleMortgageChange}
            className="slider"
          />
        </div>
      </div>

      <div className="comparison-container">
        <div className="comparison-card traditional">
          <h3>Traditional 3% Model</h3>
          <div className="comparison-breakdown">
            <div className="breakdown-row">
              <span>Buyer Agent Fee (2.5%)</span>
              <span>{formatCurrency(traditional.buyerAgentFee)}</span>
            </div>
            <div className="breakdown-row">
              <span>Title/Escrow (1.5%)</span>
              <span>{formatCurrency(traditional.titleEscrow)}</span>
            </div>
            <div className="breakdown-row highlight">
              <span>Listing Fee (3%)</span>
              <span>{formatCurrency(traditional.listingFee)}</span>
            </div>
            <div className="breakdown-row">
              <span>Mortgage Payoff</span>
              <span>{formatCurrency(mortgageBalance)}</span>
            </div>
            <div className="breakdown-total">
              <span>Net in Pocket</span>
              <span>{formatCurrency(traditional.netProceeds)}</span>
            </div>
          </div>
        </div>

        <div className="comparison-card grandview">
          <div className="grandview-badge">BEST VALUE</div>
          <h3>Grandview 1% Model</h3>
          <div className="comparison-breakdown">
            <div className="breakdown-row">
              <span>Buyer Agent Fee (2.5%)</span>
              <span>{formatCurrency(grandview.buyerAgentFee)}</span>
            </div>
            <div className="breakdown-row">
              <span>Title/Escrow (1.5%)</span>
              <span>{formatCurrency(grandview.titleEscrow)}</span>
            </div>
            <div className="breakdown-row highlight-savings">
              <span>Listing Fee (1%)</span>
              <span>{formatCurrency(grandview.listingFee)}</span>
            </div>
            <div className="breakdown-row">
              <span>Mortgage Payoff</span>
              <span>{formatCurrency(mortgageBalance)}</span>
            </div>
            <div className="breakdown-total grandview-total">
              <span>Net in Pocket</span>
              <span>{formatCurrency(grandview.netProceeds)}</span>
            </div>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <div className="savings-highlight">
          <div className="savings-icon">💰</div>
          <div className="savings-text">
            <span className="savings-label">You could save</span>
            <span className="savings-amount">{formatCurrency(savings)}</span>
            <span className="savings-note">with Grandview's 1% listing fee</span>
          </div>
        </div>
      )}

      <div className="wizard-actions">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="next-btn" onClick={onNext}>
          Get Your Personalized Report →
        </button>
      </div>
    </div>
  );
};

// Step 5: Lead Capture Component
const LeadCaptureStep = ({ formData, setFormData, onSubmit, onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       // Log the complete form data (simulating API/CRM push)
//       console.log("=== SELLER LEAD DATA ===");
//       console.log({
//         ...formData,
//         timestamp: new Date().toISOString(),
//         source: "Seller Lead Flow",
//       });
//       console.log("=======================");
//       setSubmitted(true);
//     }
//   };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    const { error } = await supabase.from("seller_leads").insert([
      {
        address: formData.address,
        beds: formData.beds,
        baths: formData.baths,
        sqft: formData.sqft,
        condition: formData.condition,
        estimated_value: formData.estimatedValue,
        mortgage_balance: formData.mortgageBalance,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error submitting");
    } else {
      setSubmitted(true);
    }
  }
};

  if (submitted) {
    return (
      <div className="wizard-step">
        <div className="success-state">
          <div className="success-checkmark">
            <svg viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="25" fill="none" />
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2>Thank You!</h2>
          <p>
            Your information has been received. One of our expert agents will
            contact you within 24 hours with your personalized market analysis.
          </p>
          <div className="success-details">
            <p>📧 A confirmation has been sent to your email</p>
            <p>📞 Expect a call from our team soon</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-step">
      <div className="step-header">
        <span className="step-number">5</span>
        <h2>Get Your Personalized Report</h2>
        <p>Enter your details below and we'll send you a comprehensive market analysis.</p>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="privacy-note">
          <p>🔒 Your information is secure and will never be shared without your consent.</p>
        </div>

        <div className="wizard-actions">
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <button type="submit" className="next-btn submit-final">
            Get My Free Report
          </button>
        </div>
      </form>
    </div>
  );
};

// Progress Indicator Component
const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={`progress-step ${index + 1 === currentStep ? "active" : ""} ${index + 1 < currentStep ? "completed" : ""}`}
          >
            <div className="progress-circle">
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <span className="progress-label">{step.label}</span>
          </div>
          {index < steps.length - 1 && <div className="progress-line" />}
        </React.Fragment>
      ))}
    </div>
  );
};

// Main SellerLeadFlow Component
export default function SellerLeadFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: "",
    beds: "",
    baths: "",
    sqft: "",
    condition: "",
    estimatedValue: 500000,
    mortgageBalance: 250000,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const steps = [
    { id: 1, label: "Address" },
    { id: 2, label: "Details" },
    { id: 3, label: "Analysis" },
    { id: 4, label: "Calculator" },
    { id: 5, label: "Contact" },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddressStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PropertyDetailsStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <CMATeaserStep
            formData={formData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <NetSheetCalculator
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <LeadCaptureStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={() => {}}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="seller-lead-flow-page">
      <div className="wizard-container">
        <div className="wizard-header">
          <h1>Sell Your Home with Confidence</h1>
          <p>Get a free market analysis and see how much you could save with our 1% listing fee.</p>
        </div>

        <ProgressIndicator currentStep={currentStep} steps={steps} />

        <div className="wizard-content">
          {renderStep()}
        </div>

        <div className="wizard-footer">
          <p>Questions? Call us at <a href="tel:+18009932262">+1 (800) 993-2262</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}