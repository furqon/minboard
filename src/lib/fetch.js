const url = import.meta.env.VITE_API_URL;

export async function getPoi() {
  return await fetch(`${url}poi`);
}

export async function getHourlyReport(dateRange) {
  return await fetch(`${url}stats/hourlyreport?fd=${dateRange.a}&ld=${dateRange.b}`);
}