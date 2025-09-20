export function daysSinceRegistration(isoString?: string): number {
  if (!isoString) return 0;

  const registrationDate = new Date(isoString);
  if (isNaN(registrationDate.getTime())) return 0;

  const now = new Date();

  const regDateOnly = new Date(registrationDate.getFullYear(), registrationDate.getMonth(), registrationDate.getDate());
  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = nowDateOnly.getTime() - regDateOnly.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}
