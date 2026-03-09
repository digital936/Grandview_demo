
// import { useState } from "react";
// import { supabase } from "../lib/supabase";
// import "../buttons/ScheduleTour.css";

// export default function ScheduleTourModal({ propertyId }) {

//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     licenseFile: null,
//   });

//   const handleSubmit = async () => {

//     if (!formData.licenseFile) {
//       alert("Please upload driving license photo");
//       return;
//     }

//     // 🔹 Step 1: Check if request already exists
//     const { data: existingRequest } = await supabase
//       .from("tour_requests")
//       .select("id")
//       .eq("property_id", propertyId)
//       .eq("email", formData.email)
//       .single();

//     if (existingRequest) {
//       alert("You have already submitted a tour request for this property.");
//       return;
//     }

//     // 🔹 Step 2: Upload license file
//     const fileName = `${Date.now()}_${formData.licenseFile.name}`;

//     const { error: uploadError } = await supabase.storage
//       .from("licenses")
//       .upload(fileName, formData.licenseFile);

//     if (uploadError) {
//       alert("File upload failed");
//       return;
//     }

//     // 🔹 Step 3: Insert tour request
//     const { error } = await supabase
//       .from("tour_requests")
//       .insert([
//         {
//           property_id: propertyId,
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           date: formData.date,
//           time: formData.time,
//           license_path: fileName,
//           status: "pending",
//         },
//       ]);

//     if (!error) {
//       alert("Tour request submitted!");
//       setShowForm(false);

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         date: "",
//         time: "",
//         licenseFile: null,
//       });
//     }
//   };

//   return (
//     <>
//       <button
//         className="schedule-btn"
//         onClick={(e) => {
//           e.stopPropagation();
//           e.preventDefault();
//           setShowForm(true);
//         }}
//       >
//         Schedule Tour
//       </button>

//       {showForm && (
//         <div className="tour-overlay">
//           <div className="tour-box">

//             <button
//               className="close-btn"
//               onClick={() => setShowForm(false)}
//             >
//               ×
//             </button>

//             <h2>Schedule a Tour</h2>

//             <input
//               type="text"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="MM-DD-YYYY"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData({ ...formData, date: e.target.value })
//               }
//             />

//             <select
//               value={formData.time}
//               onChange={(e) =>
//                 setFormData({ ...formData, time: e.target.value })
//               }
//             >
//               <option value="">Select Time</option>
//               <option>09:00 AM</option>
//               <option>10:00 AM</option>
//               <option>11:00 AM</option>
//               <option>12:00 PM</option>
//               <option>01:00 PM</option>
//               <option>02:00 PM</option>
//               <option>03:00 PM</option>
//               <option>04:00 PM</option>
//               <option>05:00 PM</option>
//               <option>06:00 PM</option>
//             </select>

//             <h5>Upload Driving License Photo</h5>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   licenseFile: e.target.files[0],
//                 })
//               }
//             />

//             <div className="form-buttons">
//               <button
//                 className="submit-btn"
//                 onClick={handleSubmit}
//               >
//                 Submit Request
//               </button>

//               <button
//                 className="cancel-btn"
//                 onClick={() => setShowForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../buttons/ScheduleTour.css";

export default function ScheduleTourModal({ propertyId }) {

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    licenseFile: null,
  });

  // ⭐ NEW: privacy policy state
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const handleSubmit = async () => {

    // ⭐ NEW: Validate required fields
  if (!formData.name.trim()) {
    alert("Please enter your full name");
    return;
  }

  if (!formData.email.trim()) {
    alert("Please enter your email");
    return;
  }

  if (!formData.phone.trim()) {
    alert("Please enter your phone number");
    return;
  }

  if (!formData.date.trim()) {
    alert("Please select a date");
    return;
  }

  if (!formData.time.trim()) {
    alert("Please select a time");
    return;
  }

    if (!formData.licenseFile) {
      alert("Please upload or capture driving license photo");
      return;
    }

    // ⭐ NEW: check privacy policy
    if (!acceptedPolicy) {
      alert("Please accept the Privacy Policy to continue");
      return;
    }

    // Step 1: Check existing request
    const { data: existingRequest } = await supabase
      .from("tour_requests")
      .select("id")
      .eq("property_id", propertyId)
      .eq("email", formData.email)
      .single();

    if (existingRequest) {
      alert("You have already submitted a tour request for this property.");
      return;
    }

    // Step 2: Upload license file
    const fileName = `${Date.now()}_${formData.licenseFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("licenses")
      .upload(fileName, formData.licenseFile);

    if (uploadError) {
      alert("File upload failed");
      return;
    }

    // Step 3: Insert request
    const { error } = await supabase
      .from("tour_requests")
      .insert([
        {
          property_id: propertyId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          license_path: fileName,
          status: "pending",
        },
      ]);

    if (!error) {
      alert("Tour request submitted!");
      setShowForm(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        licenseFile: null,
      });

      // ⭐ reset policy
      setAcceptedPolicy(false);
    }
  };

  return (
    <>
      <button
        className="schedule-btn"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowForm(true);
        }}
      >
        Schedule Tour
      </button>

      {showForm && (
        <div className="tour-overlay">
          <div className="tour-box">

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h2>Schedule a Tour</h2>

            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            {/* <input
              type="date"   // ⭐ UPDATED (better UX than text)
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            /> */}

            <input
               type="text"
               placeholder="MM-DD-YYYY"
               required
               value={formData.date}
               onChange={(e) =>
                 setFormData({ ...formData, date: e.target.value })
               }
             />

            <select
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            >
              <option value="">Select Time</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
              <option>06:00 PM</option>
            </select>

            <h5>Upload or Capture Driving License</h5>

            {/* ⭐ UPDATED: allow camera capture */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  licenseFile: e.target.files[0],
                })
              }
            />

            {/* ⭐ NEW: Privacy Policy Checkbox */}
            <div className="privacy-check">
              <input
                type="checkbox"
                id="privacy"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
              />
              <label htmlFor="privacy">
                I agree to the Privacy Policy and allow my information to be used
                for scheduling the property tour.
              </label>
            </div>

            <div className="form-buttons">
              <button
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit Request
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}