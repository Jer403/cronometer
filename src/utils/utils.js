export const oneDay = 24 * 60 * 60 * 1000;
export const oneHour = 60 * 60 * 1000;
export const oneMin = 60 * 1000;

export function formatNumber(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}
export function formatNumberAdjusted(number) {
  if (number > 0) {
    return `${number}:`;
  }
  return "";
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

export function formatMillisToAdjustedHMS(time) {
  let hours = Math.floor((time % oneDay) / oneHour);
  let minutes = Math.floor((time % oneHour) / oneMin);
  let segs = Math.floor((time % oneMin) / 1000);

  hours = formatNumberAdjusted(hours);
  segs = formatNumber(segs);

  return `${hours}${minutes}:${segs}`;
}

export function showMessage(text) {
  const messageLog = document.getElementById("message-log");
  messageLog.textContent = text;
  messageLog.classList.add("red");
  setTimeout(() => {
    messageLog.textContent = "";
    messageLog.classList.remove("red");
  }, 4000);
}

export function counterInput() {
  return document.getElementById("counterInput");
}

export function setCounterInput(text) {
  document.getElementById("counterInput").value = text;
}

export function counterText() {
  return document.getElementById("counterText");
}

export function setcounterText(text) {
  document.getElementById("counterText").value = text;
}

export const handleInterval = (initialTime, counterText) => {
  const actualDate = new Date();
  const time = actualDate.getTime() - initialTime;

  let hours = Math.floor((time % oneDay) / oneHour);
  let minutes = Math.floor((time % oneHour) / oneMin);
  let segs = Math.floor((time % oneMin) / 1000);

  hours = formatNumber(hours);
  minutes = formatNumber(minutes);
  segs = formatNumber(segs);

  counterText.textContent = `${hours}:${minutes}:${segs}`;
};

export async function clearSelectedProject() {
  return new Promise((resolve) => {
    const selected = document.querySelectorAll(".selected");
    selected.forEach((el) => {
      el.classList.remove("selected");
    });
    resolve();
  });
}

export async function selectProject(id) {
  if (id == null) return;
  document.getElementById(id).classList.add("selected");
}

export const handleToggleModal = () => {
  const modal = document.getElementById("modalContainer");
  if (modal.style.display == "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
};

export function reduceArray() {
  const arr = [
    { dateinfo: "1328", id: "173", title: "asd" },
    { dateinfo: "1328", id: "173", title: "asd" },
    { dateinfo: "1328", id: "173", title: "asd" },
    { dateinfo: "1328", id: "173", title: "asd" },
    { dateinfo: "1328", id: "173", title: "asd" },
  ];

  const reduced = arr.reduce((sum, item) => sum + Number(item.dateinfo), 0);
  console.log(reduced);
}
