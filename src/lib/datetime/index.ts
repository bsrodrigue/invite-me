export function setDayToStart(date: Date) {
  date.setHours(0, 0, 0, 0);
  return date;
}

export function setWeekToStart(date: Date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // If Sunday (0), subtract 6; otherwise, subtract (day - 1)
  date.setDate(date.getDate() + diff);
  date = setDayToStart(date);
  return date;
}

export function setMonthToStart(date: Date) {
  date.setMonth(date.getMonth(), 0);
  date = setDayToStart(date);
  return date;
}
