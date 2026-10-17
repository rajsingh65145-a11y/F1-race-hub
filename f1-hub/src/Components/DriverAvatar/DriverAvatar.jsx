function DriverAvatar({ name, size = 'md' }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return <div className={`avatar avatar-${size}`}>{initials}</div>;
}

export default DriverAvatar;