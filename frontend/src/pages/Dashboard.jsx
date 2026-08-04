import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4 text-center" style={{ maxWidth: '420px', width: '100%' }}>
        <i className="bi bi-house-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
        <h4 className="mt-3">Welcome, {user.name}!</h4>
        <p className="text-muted">You are successfully logged in.</p>
        <div className="alert alert-success py-2">
          <i className="bi bi-envelope-fill me-2"></i>{user.email}
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
