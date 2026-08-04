import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await api.post('/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate('/login', { state: { message: 'Account created! Please log in.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
          <h4 className="mt-2 mb-1">Create Account</h4>
          <p className="text-muted small mb-0">Sign up to get started</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
              <input type="text" name="name" className="form-control"
                placeholder="John Doe" value={form.name}
                onChange={handleChange} required disabled={loading} />
            </div>
          </div>

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
                placeholder="Min 6 characters" value={form.password}
                onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input type="password" name="confirm" className="form-control"
                placeholder="Re-enter password" value={form.confirm}
                onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Creating...</> : 'Register'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/login">Sign in</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Register;
