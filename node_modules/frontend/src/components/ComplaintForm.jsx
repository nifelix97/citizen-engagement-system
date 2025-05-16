import { useState } from 'react';
import { API } from '../api';
import './ComplaintForm.css'; 

export default function ComplaintForm() {
  const [form, setForm] = useState({ name: '', email: '', category: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      await API.post('/complaints', { ...form, agency: mapToAgency(form.category) });
      setSuccess(true);
      setForm({ name: '', email: '', category: '', message: '' });
      setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const mapToAgency = (category) => {
    switch (category) {
      case 'Water': return 'WASAC';
      case 'Electricity': return 'REG';
      default: return 'Local Authority';
    }
  };

  return (
    <div className="complaint-form-container">
      <h2 className="form-title">Submit Your Complaint</h2>
      <p className="form-description">
        Let us know about your issue and we'll forward it to the relevant department.
      </p>

      {success && (
        <div className="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Complaint submitted successfully! We'll review it shortly.
        </div>
      )}

      {error && (
        <div className="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={submit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            id="name"
            name="name" 
            placeholder="Enter your full name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email"
            name="email" 
            placeholder="Enter your email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Complaint Category</label>
          <select 
            id="category"
            name="category" 
            value={form.category} 
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Water">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="Roads">Roads & Infrastructure</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Complaint Details</label>
          <textarea 
            id="message"
            name="message" 
            placeholder="Please describe your issue in detail" 
            value={form.message} 
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
}