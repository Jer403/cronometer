export const oneDay = 24 * 60 * 60 * 1000;
export const oneHour = 60 * 60 * 1000;
export const oneMin = 60 * 1000;

export function formatNumber(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

export function formatDateToYearlyTime(date) {
  let day = formatNumber(date.getDate());
  let month = formatNumber(date.getMonth() + 1);
  let year = formatNumber(date.getFullYear());
  return `${day}/${month}/${year}`;
}

export function formatDateToHoursTime(date) {
  let hours = formatNumber(date.getHours());
  let min = formatNumber(date.getMinutes());
  let sec = formatNumber(date.getSeconds());
  return `${hours}:${min}:${sec}`;
}

export function formatDateToTimePassed({ hours, minutes, segs }) {
  return `${hours}:${minutes}:${segs}`;
}

export function convertTimeInMillisToHMS(time) {
  let hours = Math.floor((time % oneDay) / oneHour);
  let minutes = Math.floor((time % oneHour) / oneMin);
  let segs = Math.floor((time % oneMin) / 1000);

  hours = formatNumber(hours);
  minutes = formatNumber(minutes);
  segs = formatNumber(segs);

  return { hours, minutes, segs };
}

export function showMessage(messageLog, text) {
  messageLog.current.textContent = text;
  messageLog.current.classList.add("red");
  setTimeout(() => {
    messageLog.current.textContent = "";
    messageLog.current.classList.remove("red");
  }, 4000);
  return;
}
