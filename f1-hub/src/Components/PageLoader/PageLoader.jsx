function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-subtitle"></div>

      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="skeleton skeleton-card" key={item}></div>
        ))}
      </div>

      <span className="visually-hidden">Loading page…</span>
    </div>
  );
}

export default PageLoader;