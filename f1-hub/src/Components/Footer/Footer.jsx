function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">F1 RACE HUB</p>
          <p className="footer-text">
            An unofficial fan project built with React, CSS and JavaScript. All
            standings, results and statistics are sample data made for
            learning, not official results.
          </p>
          <p className="footer-text">
            Not affiliated with Formula 1, the FIA or any team. Formula 1, F1
            and related names are trademarks of their respective owners.
          </p>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/rajsingh65145-a11y/F1-race-hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
          </a>
          <a href="#main-content">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;