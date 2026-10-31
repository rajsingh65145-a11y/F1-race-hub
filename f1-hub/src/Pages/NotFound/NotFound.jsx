import EmptyState from '../../Components/EmptyState/EmptyState';

function NotFound() {
  return (
    <EmptyState
      icon="🚧"
      title="Page not found"
      message="This page does not exist, or it was moved."
      actionLabel="Back to home"
      actionTo="/"
    />
  );
}

export default NotFound;