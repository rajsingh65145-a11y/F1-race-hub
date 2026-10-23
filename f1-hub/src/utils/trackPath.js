// Turns a list of [x, y] points into a smooth, closed SVG path
export function buildTrackPath(points) {
  const count = points.length;
  let path = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < count; i++) {
    const p0 = points[(i - 1 + count) % count];
    const p1 = points[i];
    const p2 = points[(i + 1) % count];
    const p3 = points[(i + 2) % count];

    const c1x = (p1[0] + (p2[0] - p0[0]) / 6).toFixed(2);
    const c1y = (p1[1] + (p2[1] - p0[1]) / 6).toFixed(2);
    const c2x = (p2[0] - (p3[0] - p1[0]) / 6).toFixed(2);
    const c2y = (p2[1] - (p3[1] - p1[1]) / 6).toFixed(2);

    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }

  return `${path} Z`;
}