// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const navigate = useNavigate();

//   const [city, setCity] = useState("");
//   const [category, setCategory] = useState("buy");
//   const [propertyType, setPropertyType] = useState("");

//   const handleSearch = () => {
//     let url = `/search?city=${city}&category=${category}`;

//     if (propertyType && propertyType.trim() !== "") {
//       url += `&type=${propertyType}`;
//     }

//     navigate(url);
//   };

//   return (
//     <section className="hero">
//       <div className="overlay">
//         <h1>Find Your Dream Home with Grandview Realty</h1>
//         <p>Premium properties. Trusted guidance. Exceptional service.</p>

//         {/* <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search city or locality"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="buy">Buy</option>
//             <option value="rent">Rent</option>
//           </select>

//           <select
//             value={propertyType}
//             onChange={(e) => setPropertyType(e.target.value)}
//           >
//             <option value="">All Types</option>
//             <option value="Town Home">Town Home</option>
//             <option value="Single Family House">
//               Single Family House
//             </option>
//           </select>

//           <button onClick={handleSearch}>
//             Search
//           </button>
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import { useNavigate } from "react-router-dom";
import { FaHome, FaUserTie, FaClock, FaPercent, FaBuilding } from "react-icons/fa";

const HeroSection = () => {

  const navigate = useNavigate();

  const services = [
    {
      icon: <FaPercent />,
      title: "1% Listing Fee",
      desc: "Sell your property with one of the lowest commissions in the industry."
    },
    {
      icon: <FaBuilding />,
      title: "5% Property Management",
      desc: "Reliable full-service management for your investment properties."
    },
    {
      icon: <FaHome />,
      title: "25% Leasing Fee",
      desc: "Only 25% of the first month rent to secure high quality tenants."
    },
    {
      icon: <FaUserTie />,
      title: "Dedicated Professional",
      desc: "A real estate expert committed to maximizing your property value."
    },
    {
      icon: <FaClock />,
      title: "24/7 Service",
      desc: "Always available when you need assistance or guidance."
    }
  ];

  return (
    <section className="hero">

      <div className="hero-inner">

        <div className="hero-text">

          <span className="brand-badge">Grandview Realty</span>

          <h1>
            Luxury Real Estate <br />
            <span>Better Value</span>
          </h1>

          <p>
            Experience a modern real estate service designed around
            transparency, lower fees, and exceptional professional support.
          </p>

          <div className="hero-buttons">

            <button
              className="btn-primary"
              onClick={() => navigate("/contact")}
            >
              Get Free Consultation
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate("/rent")}
            >
              Browse Properties
            </button>

          </div>

        </div>

        <div className="hero-services">

          {services.map((service, index) => (
            <div key={index} className="glass-card">

              <div className="icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.desc}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HeroSection;