import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { circuits } from '../../data/circuits';
import { drivers } from '../../data/drivers';
import { races } from '../../data/races';
import { teams } from '../../data/teams';

const sectionTitles = {
  drivers: 'Drivers',
  teams: 'Teams',
  calendar: 'Race Calendar',
  standings: 'Championship',
  circuits: 'Circuits',
  compare: 'Compare',
  live: 'Live Race',
  garage: 'My Garage',
  search: 'Search',
};

// The name of the driver / team / race / circuit in a detail page URL
function findName(section, id) {
  let item = null;

  if (section === 'drivers') {
    item = drivers.find((d) => d.id === id);
  } else if (section === 'teams') {
    item = teams.find((t) => t.id === id);
  } else if (section === 'calendar') {
    item = races.find((r) => r.id === id);
  } else if (section === 'circuits') {
    item = circuits.find((c) => c.id === id);
  }

  return item ? item.name : null;
}

function getTitle(pathname) {
  // "/drivers/norris" -> ['drivers', 'norris']
  const parts = pathname.split('/').filter(Boolean);
  const section = parts[0];
  const id = parts[1];

  if (!section) {
    return 'Home';
  }

  if (!sectionTitles[section]) {
    return 'Page not found';
  }

  if (id) {
    const name = findName(section, id);
    return name || sectionTitles[section];
  }

  return sectionTitles[section];
}

function TitleManager() {
  const { pathname } = useLocation();
  const title = getTitle(pathname);

  useEffect(() => {
    document.title = title === 'Home' ? 'F1 Race Hub' : `${title} · F1 Race Hub`;
  }, [title]);

  return (
    <p className="visually-hidden" role="status" aria-live="polite">
      {title}
    </p>
  );
}

export default TitleManager;