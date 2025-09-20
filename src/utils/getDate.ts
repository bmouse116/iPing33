export function formatDate(isoString: string, withTime: boolean = true): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if (!withTime) return `${day}.${month}.${year}`;

  return `${day}.${month}.${year}`;
}