import { useState } from "react";
import "./App.css";
import { useRef } from "react";
import { useCard } from "./hooks/useCard.jsx";
import { Card } from "./components/Card.jsx";
import {
  convertTimeInMillisToHMS,
  formatDateToHoursTime,
  formatDateToTimePassed,
  formatDateToYearlyTime,
  formatNumber,
  oneDay,
  oneHour,
  oneMin,
  showMessage,
} from "./utils/utils";

function App() {
  const [initialTime, setInitialTime] = useState(0);
  const [activated, setActivated] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState(null);
  const { cards, addCard } = useCard();
  const cardId = useRef(0);
  const counterText = useRef();
  const counterInput = useRef();
  const messageLog = useRef();

  const handleClick = () => {
    if (counterInput.current.value == "") {
      showMessage(messageLog, "Pon un titulo");
    }

    if (activated) {
      const actualDate = new Date();
      const initialDate = new Date(initialTime);
      const time = (initialTime - actualDate.getTime()) * -1;

      const timePassed = convertTimeInMillisToHMS(time);

      const dateinfo = ` ${formatDateToYearlyTime(
        initialDate
      )} | ${formatDateToHoursTime(initialDate)} - ${formatDateToHoursTime(
        actualDate
      )} | ${formatDateToTimePassed(timePassed)}`;

      const title = counterInput.current.value;
      const id = Math.floor(Math.random() * 10000);

      setInitialTime(0);
      setActivated(false);
      clearInterval(intervalTimer);

      addCard({ id, title, dateinfo });

      counterInput.current.value = "";
      counterText.current.textContent = `00:00:00`;
    } else {
      const date = new Date().getTime();
      setInitialTime(date);
      setActivated(true);
      setIntervalTimer(setInterval(() => handleInterval(date), 1000));
    }
  };

  const handleInterval = (initialTime) => {
    const actualDate = new Date();
    const time = (initialTime - actualDate.getTime()) * -1;

    let hours = Math.floor((time % oneDay) / oneHour);
    let minutes = Math.floor((time % oneHour) / oneMin);
    let segs = Math.floor((time % oneMin) / 1000);

    hours = formatNumber(hours);
    minutes = formatNumber(minutes);
    segs = formatNumber(segs);

    counterText.current.textContent = `${hours}:${minutes}:${segs}`;
  };

  return (
    <main>
      <aside className="card-container">
        {cards.length > 0 ? (
          cards.map(({ title, dateinfo, id }) => (
            <Card
              key={`r-${(cardId.current += 1)}`}
              id={id}
              title={title}
              dateinfo={dateinfo}
            ></Card>
          ))
        ) : (
          <div>No tienes cartas guardadas</div>
        )}
      </aside>
      <aside className="input-container">
        <p className="message-log" ref={messageLog}></p>
        <input
          type="text"
          placeholder="Titulo de la tarea"
          className="counterInput"
          ref={counterInput}
        />
        <p ref={counterText} className="counterText">
          00:00:00
        </p>
        <button onClick={handleClick} className="activateBtn">
          {activated ? "Parar contador" : "Activar Contador"}
        </button>
      </aside>
    </main>
  );
}

export default App;
