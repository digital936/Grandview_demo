// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/PostPropertySection.css";

// const PostPropertySection = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="post-property">
//       <div className="container">

//         {/* Property Image */}
//         <div className="image">
//           <img
//             src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
//             alt="Sell Property"
//           />
//         </div>

//         {/* Text Content */}
//         <div className="content">
//           <h2>Sell or Rent Your Property with Grandview</h2>

//           <p>
//             Reach serious buyers and tenants faster. List your property
//             with Grandview Realty and get the right price with maximum visibility.
//           </p>

//           {/* Button */}
//           <div className="buttons">
//             <button
//               className="primary-btn"
//               onClick={() => navigate("/post-property")}
//             >
//               Post Property
//             </button>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default PostPropertySection;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostPropertySection.css";

const PostPropertySection = () => {

  const navigate = useNavigate();

  return (

    <section className="post-property">

      <div className="post-wrapper">

        <div className="post-glass">

          <div className="post-grid">

            {/* IMAGE */}
            <div className="post-image">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Sell Property"
              />
            </div>

            {/* CONTENT */}
            <div className="post-content">

              <p className="post-tag">For Property Owners</p>

              <h2>
                Sell or Rent Your Property <span>Faster</span>
              </h2>

              <p className="post-desc">
                List your property with Grandview Realty and connect with
                serious buyers and tenants. Our platform ensures maximum
                visibility and professional support.
              </p>

              <button
                className="post-btn"
                onClick={() => navigate("/post-property")}
              >
                Post Your Property
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
};

export default PostPropertySection;