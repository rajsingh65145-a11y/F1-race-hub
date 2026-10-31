import { Component } from 'react';
import EmptyState from '../EmptyState/EmptyState';

// Catches errors that happen while a page is drawing, so one broken page
// does not turn the whole app into a white screen.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('A page crashed:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <EmptyState
          icon="⚠️"
          title="Something went wrong"
          message="This page hit an unexpected error. The rest of the app still works, use the menu to go somewhere else."
          actionLabel="Try again"
          onAction={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;