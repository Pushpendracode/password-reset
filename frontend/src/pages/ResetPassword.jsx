import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/verify-reset-token/${token}`);
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const { data } = await api.post(`/reset-password/${token}`, { password });
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null)
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  if (tokenValid === false)
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow-sm p-4 text-center" style={{ maxWidth: '420px', width: '100%' }}>
          <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }}></i>
          <h5 className="mt-3">Invalid or Expired Link</h5>
          <p className="text-muted">This reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="btn btn-primary">Request New Link</Link>
        </div>
      </div>
    );

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
          <h4 className="mt-2 mb-1">Reset Password</h4>
          <p className="text-muted small mb-0">Enter your new password</p>
        </div>

        {message && (
          <div className="alert alert-success py-2">
            <i className="bi bi-check-circle-fill me-2"></i>{message} Redirecting to login...
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input type="password" className="form-control"
                  placeholder="Min 6 characters" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required disabled={loading} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input type="password" className="form-control"
                  placeholder="Re-enter password" value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required disabled={loading} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Resetting...</> : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;