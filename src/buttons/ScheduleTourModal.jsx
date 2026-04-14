
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./ScheduleTour.css";


export default function ScheduleTourModal({ propertyId, closeModal }) {


const formatToUSDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US").format(date); // MM/DD/YYYY
};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    licenseFile: null,
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "10:00 AM","11:00 AM","12:00 PM",
    "1:00 PM","2:00 PM","3:00 PM",
  ];

  /* LOCK SCROLL + ESC CLOSE */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  useEffect(() => {
    if (formData.date) fetchBookedSlots();
  }, [formData.date]);

  async function fetchBookedSlots() {
    const { data } = await supabase
      .from("tour_requests")
      .select("time")
      .eq("property_id", propertyId)
      .eq("date", formData.date);

    if (data) setBookedSlots(data.map(d => d.time));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidUSPhone(phone) {
    return /^(\+1[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(phone);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert("Invalid email");
      return;
    }

    if (!isValidUSPhone(formData.phone)) {
      alert("Invalid US phone");
      return;
    }

    try {
      setLoading(true);

      let licensePath = null;

      if (formData.licenseFile) {
        const fileExt = formData.licenseFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("licenses")
          .upload(fileName, formData.licenseFile);

        if (uploadError) throw uploadError;

        licensePath = fileName;
      }

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
            license_path: licensePath,
          },
        ]);

      if (error) throw error;

      // alert("Your tour request has been successfully submitted.\nYou will receive a confirmation via email or text message shortly.");
      // closeModal();

      alert("Thank you for submitting your self-tour request. Our team will review your details and get back to you shortly with the next steps.\n For immediate assistance, please contact Whitney [Insert Number] or Isha [Insert Number].");
      closeModal();

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tour-overlay" onClick={closeModal}>
      <div className="tour-box" onClick={(e) => e.stopPropagation()}>

        {/* <button className="close-btn" onClick={closeModal}>✕</button> */}

        <h2>Schedule Property Tour</h2>

        <form onSubmit={handleSubmit}>

          <input type="text" name="name" required placeholder="Full Name" onChange={handleChange} />
          <input type="email" name="email" required placeholder="Email" onChange={handleChange} />
          <input type="tel" name="phone" required placeholder="Phone" onChange={handleChange} />
          {/* <input type="date" name="date" required placeholder="Select Date" onChange={handleChange} /> */}

          {/* Visible US Format Input */}
<input
  type="text"
  placeholder="MM-DD-YYYY"
  value={formatToUSDate(formData.date)}
  readOnly
  onClick={() => document.getElementById("hiddenDate").showPicker()}
/>

{/* Hidden Real Date Input (controls actual value) */}
<input
  id="hiddenDate"
  type="date"
  name="date"
  required
  value={formData.date}
  onChange={handleChange}
  style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
/>

          <select name="time" required onChange={handleChange}>
            <option value="">Select Time</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot} disabled={bookedSlots.includes(slot)}>
                {slot} {bookedSlots.includes(slot) ? "(Booked)" : ""}
              </option>
            ))}
          </select>

<div className="file-upload">
  <label htmlFor="licenseUpload">Upload Driving Licence</label>
  <input 
    type="file"
    id="licenseUpload"
    name="licenseFile"
    accept="image/*"
    // capture="environment"
    onChange={handleChange}
  />
</div>

          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>

        </form>

      </div>
    </div>
  );
}