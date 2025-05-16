import { useEffect, useState } from 'react';
import { API } from '../api';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get('/complaints').then(res => setComplaints(res.data));
  }, []);

  return (
    <div>
      {complaints.map(c => (
        <div key={c._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Category:</strong> {c.category}</p>
          <p><strong>Agency:</strong> {c.agency}</p>
          <p><strong>Status:</strong> {c.status}</p>
          <p><strong>Your Message:</strong> {c.message}</p>
          {c.response && (
            <p><strong>Response:</strong> {c.response}</p>
          )}
        </div>
      ))}
    </div>
  );
}
