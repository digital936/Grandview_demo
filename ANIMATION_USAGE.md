/* SCROLL ANIMATION USAGE GUIDE */

/* 1. IMPORT CSS IN YOUR MAIN COMPONENT OR APP.JSX */
import '../styles/animations.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* 2. USE THE HOOK IN ANY COMPONENT */
function MyComponent() {
  useScrollAnimation();
  
  return (
    // Your JSX with animated elements
  );
}

/* 3. ADD data-animate ATTRIBUTE + ANIMATION CLASS TO ELEMENTS */

/* EXAMPLE 1: Fade Up Animation */
<h1 data-animate className="fade-up">
  Welcome to Our Website
</h1>

/* EXAMPLE 2: Fade Up with Stagger Delays */
<p data-animate className="fade-up fade-up-delay-1">
  First paragraph
</p>
<p data-animate className="fade-up fade-up-delay-2">
  Second paragraph  
</p>
<p data-animate className="fade-up fade-up-delay-3">
  Third paragraph
</p>

/* EXAMPLE 3: Buttons with Delays */
<button data-animate className="fade-up fade-up-delay-3">
  Call to Action
</button>

/* EXAMPLE 4: Images Fade Right */
<img data-animate className="fade-right" src="..." alt="..." />

/* EXAMPLE 5: Cards with Stagger */
<div className="card" data-animate className="fade-left">
  Card 1
</div>
<div className="card" data-animate className="fade-left fade-left-delay-1">
  Card 2
</div>
<div className="card" data-animate className="fade-left fade-left-delay-2">
  Card 3
</div>

/* EXAMPLE 6: Scale Up Animation */
<div data-animate className="scale-up">
  Important Content
</div>

/* EXAMPLE 7: Rotate In Animation */
<div data-animate className="rotate-in">
  Special Offer
</div>

/* EXAMPLE 8: Blur In Animation */
<section data-animate className="blur-in">
  Featured Section
</section>

/* EXAMPLE 9: Slide Down Animation */
<div data-animate className="slide-down">
  Header Content
</div>

/* EXAMPLE 10: Simple Fade In */
<p data-animate className="fade-in fade-in-delay-1">
  Additional info
</p>

/* ===== AVAILABLE ANIMATIONS ===== */

/*
fade-up          - Slides up with opacity
fade-left        - Slides from left with opacity
fade-right       - Slides from right with opacity
fade-in          - Simple opacity fade
scale-up         - Scales from smaller to normal
rotate-in        - Rotates in while scaling
slide-down       - Slides down from top
blur-in          - Unfolds from blur
*/

/* ===== DELAY CLASSES ===== */

/*
fade-up-delay-1/2/3/4      - 0.1s, 0.2s, 0.3s, 0.4s delay
fade-left-delay-1/2/3      - 0.1s, 0.2s, 0.3s delay
fade-right-delay-1/2/3     - 0.1s, 0.2s, 0.3s delay
fade-in-delay-1/2/3/4      - 0.1s, 0.2s, 0.3s, 0.4s delay
scale-up-delay-1/2         - 0.1s, 0.2s delay
*/

/* ===== HOW TO APPLY IN REAL COMPONENTS ===== */

/* In Hero.jsx */
export default function Hero() {
  useScrollAnimation();
  
  return (
    <section className="hero">
      <h1 data-animate className="fade-up">
        Find Your Dream Home
      </h1>
      <p data-animate className="fade-up fade-up-delay-1">
        Explore premium properties in your area
      </p>
      <button data-animate className="fade-up fade-up-delay-2">
        Start Exploring
      </button>
    </section>
  );
}

/* In PropertyCard.jsx */
export default function PropertyCard({ property }) {
  return (
    <div data-animate className="fade-right property-card">
      <img src={property.image} alt={property.name} />
      <h3 data-animate className="fade-up fade-up-delay-1">
        {property.name}
      </h3>
      <p data-animate className="fade-up fade-up-delay-2">
        {property.price}
      </p>
    </div>
  );
}

/* In BenefitsSection.jsx */
export default function BenefitsSection() {
  useScrollAnimation();
  
  return (
    <section>
      <h2 data-animate className="fade-up">
        Our Benefits
      </h2>
      
      <div data-animate className="fade-up fade-up-delay-1">
        Benefit 1
      </div>
      <div data-animate className="fade-up fade-up-delay-2">
        Benefit 2
      </div>
      <div data-animate className="fade-up fade-up-delay-3">
        Benefit 3
      </div>
    </section>
  );
}

/* ===== NOTES ===== */

/*
- Add useScrollAnimation() in main component or app.jsx
- Elements must have both data-animate attribute AND animation class
- Use delays to create stagger effects
- threshold: 0.15 means animation triggers when 15% of element is visible
- rootMargin: '-50px' means animation starts 50px before element reaches viewport
- Optional: Uncomment "observer.unobserve()" to trigger animation only once
- Optional: Uncomment "classList.remove('visible')" to reverse animation on scroll out
*/
