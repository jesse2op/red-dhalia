import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('employee'); // 'employee' or 'owner'
  const [error, setError] = useState('');

  // Default credentials
  const credentials = {
    employee: { username: 'employee', password: 'employee123' },
    owner: { username: 'owner', password: 'owner123' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const creds = credentials[loginType];
    
    if (username === creds.username && password === creds.password) {
      onLogin(loginType === 'employee' ? 'employee' : 'owner');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-8">
      <div className="bg-dark-surface border border-dark-border rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md text-dark-text-primary">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-text-primary mb-2">🌺 Red Dhalia</h1>
          <p className="text-dark-text-secondary text-sm sm:text-base">Elegant Dining Experience</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex gap-2 mb-6 bg-dark-bg p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setLoginType('employee');
              setError('');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm sm:text-base transition-all duration-200 ${
              loginType === 'employee'
                ? 'bg-cafe-brown text-white shadow-md'
                : 'text-dark-text-secondary hover:text-dark-text-primary'
            }`}
          >
            Employee Login
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType('owner');
              setError('');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm sm:text-base transition-all duration-200 ${
              loginType === 'owner'
                ? 'bg-cafe-brown text-white shadow-md'
                : 'text-dark-text-secondary hover:text-dark-text-primary'
            }`}
          >
            Owner Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-dark-text-secondary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:border-cafe-brown focus:outline-none transition-colors duration-200 text-white text-sm sm:text-base placeholder:text-dark-text-secondary"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-dark-text-secondary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:border-cafe-brown focus:outline-none transition-colors duration-200 text-white text-sm sm:text-base placeholder:text-dark-text-secondary"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-cafe-brown/20 border-2 border-cafe-brown text-cafe-pink px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-cafe-brown text-white py-3 px-4 rounded-lg font-semibold hover:bg-cafe-dark-brown transition-colors duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        {/* Default Credentials Info */}
        <div className="mt-6 pt-6 border-t border-dark-border">
          <p className="text-xs text-dark-text-secondary text-center">
            <strong className="text-dark-text-primary">Default Credentials:</strong><br />
            Employee: <code className="bg-dark-bg px-1 rounded border border-dark-border text-dark-text-primary">employee / employee123</code><br />
            Owner: <code className="bg-dark-bg px-1 rounded border border-dark-border text-dark-text-primary">owner / owner123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

