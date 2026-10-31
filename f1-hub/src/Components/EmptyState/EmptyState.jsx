import { Link } from 'react-router-dom';

function EmptyState({
  icon = '🏁',
  title,
  message,
  actionLabel,
  onAction,
  actionTo,
}) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon" aria-hidden="true">
        {icon}
      </span>
      <h2 className="empty-state-title">{title}</h2>
      {message && <p className="empty-state-message">{message}</p>}

      {actionLabel && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}

      {actionLabel && actionTo && (
        <Link to={actionTo} className="empty-state-action">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;