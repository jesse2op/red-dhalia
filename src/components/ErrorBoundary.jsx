import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg">
          <div className="text-center p-8 bg-dark-surface border border-dark-border rounded-lg shadow-lg max-w-md">
            <h1 className="text-2xl font-bold text-cafe-brown mb-4">Something went wrong</h1>
            <p className="text-dark-text-secondary mb-4">{this.state.error?.toString()}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-cafe-brown text-white px-4 py-2 rounded-lg hover:bg-cafe-dark-brown"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

