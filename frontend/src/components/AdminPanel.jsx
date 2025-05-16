import { useEffect, useState } from 'react';
import { API } from '../api';
import './AdminPanel.css'; 

export default function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get('/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => setError('Failed to load complaints'))
      .finally(() => setLoading(false));
  }, []);

  const updateComplaint = async (id, updates) => {
    try {
      await API.put(`/complaints/${id}`, updates);
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, ...updates } : c));
    } catch (err) {
      console.error('Failed to update complaint:', err);
      alert('Failed to update the complaint. Please try again.');
    }
  };

  if (loading) return <div className="admin-loading">Loading complaints...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-panel">
      <h1 className="admin-title">Complaint Management System</h1>
      <div className="complaint-count">
        {complaints.length} {complaints.length === 1 ? 'Complaint' : 'Complaints'} Found
      </div>
      
      <div className="complaints-container">
        {complaints.length === 0 ? (
          <div className="no-complaints">No complaints submitted yet.</div>
        ) : (
          complaints.map(c => (
            <div key={c._id} className={`complaint-card status-${c.status.toLowerCase().replace(' ', '-')}`}>
              <div className="complaint-header">
                <span className={`status-badge ${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span>
                <h3 className="complaint-title">{c.category}</h3>
                <div className="complaint-agency">{c.agency}</div>
              </div>
              
              <div className="complaint-body">
                <p className="complaint-message">{c.message}</p>
                <div className="complaint-info">
                  <div className="info-item">
                    <span className="info-label">Submitted:</span> 
                    <span className="info-value">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Contact:</span> 
                    <span className="info-value">{c.email || 'Not provided'}</span>
                  </div>
                </div>
              </div>
              
              <div className="complaint-actions">
                <div className="action-group">
                  <label htmlFor={`response-${c._id}`}>Admin Response:</label>
                  <textarea
                    id={`response-${c._id}`}
                    className="response-textarea"
                    placeholder="Enter your response to this complaint"
                    value={c.response || ''}
                    onChange={(e) => updateComplaint(c._id, { response: e.target.value })}
                  />
                </div>
                
                <div className="action-group">
                  <label htmlFor={`status-${c._id}`}>Update Status:</label>
                  <select 
                    id={`status-${c._id}`}
                    className="status-select"
                    value={c.status} 
                    onChange={(e) => updateComplaint(c._id, { status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}