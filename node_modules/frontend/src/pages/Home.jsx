import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submit Your Complaint</h2>
      <ComplaintForm />
      <hr />
      <h3>Your Submitted Complaints</h3>
      <ComplaintList />
    </div>
  );
}
