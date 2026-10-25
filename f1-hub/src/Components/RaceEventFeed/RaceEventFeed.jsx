import { tyreCompounds } from '../../data/tyres';
import { formatLapTime } from '../../utils/lapTimes';
import { getLastName } from '../../utils/names';
import '../../styles/live.css';

function describeEvent(event, driver) {
  const name = driver ? getLastName(driver.name) : 'A driver';

  switch (event.type) {
    case 'start':
      return 'Lights out! The race is under way';
    case 'pit': {
      const compound = tyreCompounds.find((t) => t.id === event.detail);
      return `${name} pits for ${compound ? compound.name : 'new'} tyres`;
    }
    case 'retire':
      return `${name} retires from the race`;
    case 'lead':
      return `${name} takes the lead`;
    case 'fastest':
      return `Fastest lap: ${name} ${formatLapTime(event.detail)}`;
    case 'finish':
      return `Chequered flag! ${name} wins the race`;
    default:
      return '';
  }
}

function RaceEventFeed({ events, drivers }) {
  // Newest first, and only the latest 12
  const recentEvents = [...events].reverse().slice(0, 12);

  if (recentEvents.length === 0) {
    return <p className="event-empty">No events yet. Start the race!</p>;
  }

  return (
    <ul className="event-feed">
      {recentEvents.map((event) => {
        const driver = drivers.find((d) => d.id === event.driverId);

        return (
          <li
            key={`${event.lap}-${event.type}-${event.driverId}`}
            className={`event event-${event.type}`}
          >
            <span className="event-lap">L{event.lap}</span>
            <span>{describeEvent(event, driver)}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default RaceEventFeed;