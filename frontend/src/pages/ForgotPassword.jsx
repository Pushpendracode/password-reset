import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/forgot-password', { email });
      setMessage(data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <i className="bi bi-key-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
          <h4 className="mt-2 mb-1">Forgot Password</h4>
          <p className="text-muted small mb-0">Enter your email and we'll send you a reset link</p>
        </div>

        {message && (
          <div className="alert alert-success py-2">
            <i className="bi bi-check-circle-fill me-2"></i>{message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
              <input type="email" className="form-control"
                placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required disabled={loading} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</> : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none small">
            <i className="bi bi-arrow-left me-1"></i>Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;