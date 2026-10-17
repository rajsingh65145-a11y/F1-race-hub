function StatCard({ label, value, detail, progress }) {
  return (
    <div className="card stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>

      {detail && <p className="stat-detail">{detail}</p>}

      {progress !== undefined && (
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export default StatCard;