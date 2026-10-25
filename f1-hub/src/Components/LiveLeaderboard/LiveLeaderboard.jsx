import '../../styles/live.css';

function RaceControls({ lap, totalLaps, isRunning, onToggle, onReset }) {
  const isFinished = lap >= totalLaps;
  const hasStarted = lap > 0;
  const progress = (lap / totalLaps) * 100;

  let statusLabel = 'Ready on the grid';
  if (isFinished) {
    statusLabel = 'Chequered flag';
  } else if (isRunning) {
    statusLabel = lap === totalLaps - 1 ? 'Final lap' : 'Green flag';
  } else if (hasStarted) {
    statusLabel = 'Race paused';
  }

  let toggleLabel = 'Start race';
  if (isRunning) {
    toggleLabel = 'Pause';
  } else if (hasStarted) {
    toggleLabel = 'Resume';
  }

  const isLive = isRunning && !isFinished;

  return (
    <section className="race-controls">
      <div>
        <div className="race-status">
          <span className={`status-dot ${isLive ? 'status-dot-live' : ''}`}></span>
          {statusLabel}
        </div>
        <p className="lap-counter">
          {lap}
          <span> / {totalLaps}</span>
        </p>
        <p className="lap-caption">Laps completed</p>
      </div>

      <div className="race-progress">
        <div className="race-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="control-buttons">
        <button
          className="control-btn control-btn-primary"
          onClick={onToggle}
          disabled={isFinished}
        >
          {toggleLabel}
        </button>
        <button className="control-btn" onClick={onReset} disabled={!hasStarted}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default RaceControls;