import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.message || '';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/login', form);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle text-primary" style={{ fontSize: '2.5rem' }}></i>
          <h4 className="mt-2 mb-1">Welcome Back</h4>
          <p className="text-muted small mb-0">Sign in to your account</p>
        </div>

        {successMsg && (
          <div className="alert alert-success py-2">
            <i className="bi bi-check-circle-fill me-2"></i>{successMsg}
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
              <input type="email" name="email" className="form-control"
                placeholder="you@example.com" value={form.email}
                onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input type="password" name="password" className="form-control"
                placeholder="Your password" value={form.password}
                onChange={handleChange} required disabled={loading} />
            </div>
            <div className="text-end mt-1">
              <Link to="/forgot-password" className="small text-decoration-none">Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</> : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>Don't have an account? <Link to="/register">Sign up</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Login;