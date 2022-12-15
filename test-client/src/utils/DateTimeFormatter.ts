const formatTwoDigits = (num: number): string => "0".concat(num.toString()).slice(-2)

export function formatDate(date: Date): string {
  return `${formatTwoDigits(date.getDate())}/${formatTwoDigits(date.getMonth() + 1)}/${date.getFullYear()}`
}

export function formatTime(date: Date): string {
  return `${formatTwoDigits(date.getHours())}:${formatTwoDigits(date.getMinutes())}:${formatTwoDigits(date.getSeconds())}`
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`
}