// "George Russell" -> "George"
export function getFirstName(fullName) {
  return fullName.split(' ')[0];
}

// "George Russell" -> "Russell"
export function getLastName(fullName) {
  const parts = fullName.split(' ');
  return parts[parts.length - 1];
}