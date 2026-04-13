

// import { FaBed, FaBath } from "react-icons/fa";
// import { BiArea } from "react-icons/bi";

// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { supabase } from "../lib/supabase";
// import "../styles/Rent.css";

// import ScheduleTourModal from "../buttons/ScheduleTourModal";
// import ZillowButton from "../buttons/ZillowButton";
// import Footer from "../components/Footer";

// export default function Rent() {

//   const [properties, setProperties] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [sortOrder, setSortOrder] = useState("");

//   /* ⭐ modal state */
//   const [showTourModal, setShowTourModal] = useState(false);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   /* ⭐ GET CITY FROM URL (Top Cities click) */
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const city = params.get("city");

//     if (city) {
//       setSelectedCity(city);
//     }
//   }, [location]);

//   async function fetchProperties() {
//     const { data, error } = await supabase
//       .from("properties")
//       .select("*")
//       .eq("status", "available");

//     if (error) {
//       console.log(error);
//     } else {
//       setProperties(data);
//     }
//   }

//   const handleNavigate = (id) => {
//     navigate(`/property/${id}`);
//   };

//   /* ========================= */
//   /* OPEN MODAL FUNCTION       */
//   /* ========================= */

//   const openTourModal = (propertyId) => {
//     setSelectedPropertyId(propertyId);
//     setShowTourModal(true);
//   };

//   const closeTourModal = () => {
//     setShowTourModal(false);
//     setSelectedPropertyId(null);
//   };

//   /* ========================= */
//   /* FILTER LOGIC              */
//   /* ========================= */

//   let filteredProperties = properties;

//   if (selectedCity) {
//     filteredProperties = filteredProperties.filter(
//       (property) => property.city === selectedCity
//     );
//   }

//   if (sortOrder === "lowToHigh") {
//     filteredProperties = [...filteredProperties].sort(
//       (a, b) => a.price - b.price
//     );
//   }

//   if (sortOrder === "highToLow") {
//     filteredProperties = [...filteredProperties].sort(
//       (a, b) => b.price - a.price
//     );
//   }

//   /* ========================= */
//   /* UNIQUE CITY LIST          */
//   /* ========================= */

//   const cities = [...new Set(properties.map((p) => p.city))];

//   /* ========================= */
//   /* CLEAR FILTERS             */
//   /* ========================= */

//   const clearFilters = () => {
//     setSelectedCity("");
//     setSortOrder("");
//   };

//   return (
//     <>
//       <div className="rent-page">

//         <h1 className="page-title">
//           {selectedCity
//             ? `Properties for Rent in ${selectedCity}`
//             : "Properties for Rent"}
//         </h1>

//         {/* FILTER SECTION */}
//         <div className="rent-filters">

//           <select
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//           >
//             <option value="">All Cities</option>

//             {cities.map((city, index) => (
//               <option className="cities-filter" key={index} value={city}>
//                 {city}
//               </option>
//             ))}

//           </select>

//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <option value="">Sort By Rent</option>
//             <option className="cities-filter" value="lowToHigh">Low to High</option>
//             <option className="cities-filter" value="highToLow">High to Low</option>
//           </select>

//           <button
//             className="clear-filters"
//             onClick={clearFilters}
//           >
//             Clear Filters
//           </button>

//         </div>

//         {/* PROPERTY GRID */}
//         <div className="property-grid">

//           {filteredProperties.length === 0 && (
//             <p>No properties found.</p>
//           )}

//           {filteredProperties.map((property) => (
//             <div
//               className="property-cards"
//               key={property.id}
//             >
//               <div className="image-wrapper">

//                 <img
//                   src={property.imageUrl}
//                   alt={property.title}
//                 />

//                 <span className="offer-badge">OFFER</span>

//                 <span className="price-tag">
//                   ${Number(property.price).toLocaleString()}
//                 </span>

//               </div>

//               <div className="property-content">

//                 <h3>{property.title} {property.city}, {property.zipcode}</h3>
                

//                 <p className="location">
//                   {property.city}
//                 </p>

//                 <div className="property-info">

//                   <span>
//                     <FaBed size={22} /> {property.beds}
//                   </span>

//                   <span>
//                     <FaBath size={22} /> {property.baths}
//                   </span>

//                   <span>
//                     <BiArea size={22} /> {property.sqft} sqft
//                   </span>

//                 </div>

//                 <div className="card-buttons">

//                   <div className="top-row">

//                     <ZillowButton
//                     className="schedule-btn"
//                       zillowLink={property.zillow_url}
//                     />

//                     <button
//                       className="schedule-btn"
//                       onClick={() => openTourModal(property.id)}
//                     >
//                       Schedule Tour
//                     </button>

//                   </div>

//                   <button
//                     className="details-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleNavigate(property.id);
//                     }}
//                   >
//                     View Details
//                   </button>

//                 </div>

//               </div>
//             </div>
//           ))}

//         </div>

//       </div>

//       {/* MODAL */}
//       {showTourModal && (
//         <ScheduleTourModal
//           propertyId={selectedPropertyId}
//           closeModal={closeTourModal}
//         />
//       )}

//       <Footer />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import Footer from "../components/Footer";
import "../styles/Rent.css";

export default function Rent() {
  const [properties, setProperties] = useState([]);
  const [activeImage, setActiveImage] = useState({});
  const [tourProperty, setTourProperty] = useState(null);
  const [showCallPopup, setShowCallPopup] = useState(null);

  const navigate = useNavigate();
  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    fetchProperties();
  }, []);

  // Mobile Auto Slider
  useEffect(() => {
    if (!isMobile()) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => {
        const updated = { ...prev };

        properties.forEach((property) => {
          const images = getGalleryImages(property);
          if (images.length <= 1) return;

          const current = updated[property.id] || 0;
          updated[property.id] = (current + 1) % images.length;
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [properties]);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "available") // ⭐ This hides rented properties
      .order("created_at", { ascending: false });

    setProperties(data);
  }

  // Same logic as PropertyDetails
  function getGalleryImages(property) {
    if (!property) return [];

    if (Array.isArray(property.images)) return property.images;

    if (typeof property.images === "string") {
      try {
        const parsed = JSON.parse(property.images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    return [];
  }

  const nextImage = (e, property) => {
    e.stopPropagation();
    const images = getGalleryImages(property);

    setActiveImage((prev) => {
      const current = prev[property.id] || 0;
      return { ...prev, [property.id]: (current + 1) % images.length };
    });
  };

  const prevImage = (e, property) => {
    e.stopPropagation();
    const images = getGalleryImages(property);

    setActiveImage((prev) => {
      const current = prev[property.id] || 0;
      return {
        ...prev,
        [property.id]: (current - 1 + images.length) % images.length,
      };
    });
  };

  return (
    <>
    <div className="rent-page">
      <h1 className="rent-title">Homes for Rent</h1>

      <div className="property-grid">
        {properties.map((property) => {
          const images = getGalleryImages(property);
          const current = activeImage[property.id] || 0;

          return (
            <div
              key={property.id}
              className="rent-property-card"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <div className="card-image">
                {images.length > 0 ? (
                  <img src={images[current]} alt="property" />
                ) : (
                  <div className="no-image">No Image</div>
                )}

                <div className="price-tag">
                  ${Number(property.price).toLocaleString()}
                </div>

                {!isMobile() && images.length > 1 && (
                  <>
                    <button
                      className="slider-btn left"
                      onClick={(e) => prevImage(e, property)}
                    >
                      ‹
                    </button>

                    <button
                      className="slider-btn right"
                      onClick={(e) => nextImage(e, property)}
                    >
                      ›
                    </button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="image-dots">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className={
                          i === current ? "dot active-dot" : "dot"
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3>{property.title}</h3>

                <p className="card-address">
                  {property.address}, {property.city}, {property.zipcode}
                </p>

                <div className="rent-card-actions">
                  <button
                    className="call-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMobile()) {
                        window.location.href = "tel:+1 (479) 995-9165";
                      } else {
                        setShowCallPopup(property);
                      }
                    }}
                  >
                    Call
                  </button>

                  <button
                    className="tour-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTourProperty(property);
                    }}
                  >
                    Request Tour
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call Popup */}
      {showCallPopup && (
        <div
          className="call-popup-overlay"
          onClick={() => setShowCallPopup(null)}
        >
          <div className="call-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Agent</h3>
            <p>{showCallPopup.address}</p>
            <a href="tel:+1 (479) 995-9165" className="popup-call-btn">
              Call Now
            </a>
          </div>
        </div>
      )}

      {tourProperty && (
        <ScheduleTourModal
          propertyId={tourProperty.id}
          closeModal={() => setTourProperty(null)}
        />
      )}
    </div>
    <Footer />
    </>
  );
}