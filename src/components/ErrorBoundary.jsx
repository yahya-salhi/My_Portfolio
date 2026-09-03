import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[portfolio] ErrorBoundary caught:", error?.message, errorInfo?.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
          <div className="w-full max-w-md rounded-2xl border border-border-light bg-bg-glass p-8 shadow-lg">
            <span className="accent-dot mx-auto mb-4 block h-3 w-3 rounded-full" />
            <h1 className="text-2xl font-bold text-text-primary">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              An unexpected error occurred. You can try refreshing the page, or
              reach out directly if the problem persists.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-text-primary shadow-glow transition-all hover:bg-accent-tertiary hover:shadow-glow-lg"
              >
                Try again
              </button>
              <a
                href="mailto:pcclub10@gmail.com"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-light bg-bg-glass px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent-primary hover:shadow-glow"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
