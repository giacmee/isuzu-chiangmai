export function formatBaht(amount: number): string {
  return new Intl.NumberFormat("th-TH").format(Math.round(amount));
}

export function formatThaiDate(isoDate: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}
