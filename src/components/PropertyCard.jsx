// import React from 'react';
// import './PropertyCard.css';

// const PropertyCard = ({ property, onClick }) => {
//   const statusColors = {
//     available: '#10b981',
//     booked: '#f59e0b',
//     maintenance: '#ef4444',
//   };

//   const statusBg = {
//     available: '#d1fae5',
//     booked: '#fef3c7',
//     maintenance: '#fee2e2',
//   };

//   const status = property.status?.toLowerCase() || 'available';

//   return (
//     <div className="property-card" onClick={onClick}>
//       <div className="property-card-image">
//         <img 
//           src={property.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} 
//           alt={property.title}
//         />
//         <div 
//           className="property-status-badge"
//           style={{
//             backgroundColor: statusBg[status] || statusBg.available,
//             color: statusColors[status] || statusColors.available
//           }}
//         >
//           {property.status || 'Available'}
//         </div>
//       </div>

//       <div className="property-card-content">
//         <h3 className="property-title">{property.title}</h3>
//         <p className="property-location">
//           {property.city && property.state 
//             ? `${property.city}, ${property.state}` 
//             : property.city || 'Location TBD'}
//         </p>

//         <div className="property-details">
//           <span className="property-price">${property.price}/mo</span>
//           <span className="property-type">{property.type || 'Residential'}</span>
//         </div>

//         <div className="property-footer">
//           <span className="property-beds">
//             {property.beds || 0} bed{property.beds !== 1 ? 's' : ''}
//           </span>
//           <span className="property-baths">
//             {property.baths || 0} bath{property.baths !== 1 ? 's' : ''}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyCard;

import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, onClick }) => {
  const statusColors = {
    available: '#10b981',
    booked: '#f59e0b',
    maintenance: '#ef4444',
  };

  const statusBg = {
    available: '#d1fae5',
    booked: '#fef3c7',
    maintenance: '#fee2e2',
  };

  const status = property.status?.toLowerCase() || 'available';

  return (
    <div className="estate-card" onClick={onClick}>
      
      <div className="estate-card-image">
        <img 
          src={property.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} 
          alt={property.title}
        />

        <div 
          className="estate-status-badge"
          style={{
            backgroundColor: statusBg[status] || statusBg.available,
            color: statusColors[status] || statusColors.available
          }}
        >
          {property.status || 'Available'}
        </div>
      </div>

      <div className="estate-card-content">

        <h3 className="estate-title">{property.title}</h3>

        <p className="estate-location">
          {property.city && property.state 
            ? `${property.city}, ${property.state}` 
            : property.city || 'Location TBD'}
        </p>

        <div className="estate-details">
          <span className="estate-price">${property.price}/mo</span>
          <span className="estate-type">{property.type || 'Residential'}</span>
        </div>

        <div className="estate-footer">
          <span className="estate-beds">
            {property.beds || 0} bed{property.beds !== 1 ? 's' : ''}
          </span>

          <span className="estate-baths">
            {property.baths || 0} bath{property.baths !== 1 ? 's' : ''}
          </span>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;