import {
  counterInput,
  counterText,
  handleInterval,
  setCounterInput,
  setcounterText,
  showMessage,
} from "../utils/utils";
import { useCard } from "./useCard";

export function useTimer() {
  const {
    addCardToProject,
    updateCardFromProject,
    activated,
    setActivated,
    resumedId,
    setResumedId,
    initialTime,
    setInitialTime,
    intervalTimer,
    setIntervalTimer,
  } = useCard();
  const { currentProject } = useCard();

  const timerClick = () => {
    if (counterInput().value == "") {
      showMessage("Pon un titulo");
      return;
    }

    if (currentProject == null) {
      showMessage("Selecciona un projecto");
      return;
    }

    if (activated == true) {
      console.log("activated true");
      const actualDate = new Date();
      const time = actualDate.getTime() - initialTime;

      const title = counterInput().value;
      const id = Math.floor(Math.random() * 10000);

      setInitialTime(0);
      setActivated(false);
      clearInterval(intervalTimer);

      addCardToProject({
        projectId: currentProject,
        cardData: { id, title, dateinfo: time },
      });

      setCounterInput("");
      setcounterText(`00:00:00`);
      counterInput().disabled = false;
    } else if (activated == null) {
      console.log("activated null");
      const actualDate = new Date();
      const time = actualDate.getTime() - initialTime;

      updateCardFromProject({
        projectId: currentProject,
        id: resumedId,
        time,
      });

      setInitialTime(0);
      setActivated(false);
      clearInterval(intervalTimer);
      setResumedId(null);

      counterInput().value = "";
      counterText().textContent = `00:00:00`;
      counterInput().disabled = false;
    } else if (activated == false) {
      console.log("activated false");
      const date = new Date().getTime();
      setInitialTime(date);
      setActivated(true);
      counterInput().disabled = true;
      setIntervalTimer(
        setInterval(() => handleInterval(date, counterText()), 1000)
      );
    }
  };

  const resumeClick = ({ time, id, title }) => {
    const date = new Date().getTime() - time;
    setInitialTime(date);
    setActivated(null);
    counterInput().disabled = true;
    counterInput().value = title;
    setResumedId(id);
    console.log(id);
    handleInterval(date, counterText());
    setIntervalTimer(
      setInterval(() => handleInterval(date, counterText()), 1000)
    );
  };

  return {
    activated,
    timerClick,
    resumeClick,
  };
}
