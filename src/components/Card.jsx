import { useState } from "react";
import { useCard } from "../hooks/useCard";
import {
  convertTimeInMillisToHMS,
  formatDateToTimePassed,
} from "../utils/utils";
import { PLAY_ICON, TRASH_ICON } from "../icons/icons";
import { useTimer } from "../hooks/useTimer";

// eslint-disable-next-line react/prop-types
export function Card({ title, dateinfo, id }) {
  const { removeCardFromProject, currentProject } = useCard();
  const [cardId] = useState(id);
  const { resumeClick } = useTimer();

  const handleClick = () => {
    removeCardFromProject({ projectId: currentProject, id: cardId });
  };

  const handleResume = () => {
    resumeClick({ time: dateinfo, id, title });
  };

  return (
    <>
      <div className="card">
        <h2 className="card-title">{title}</h2>
        <p className="card-timeinfo">
          {formatDateToTimePassed(convertTimeInMillisToHMS(dateinfo))}
        </p>
        <button className="close-btn" onClick={handleClick}>
          <TRASH_ICON></TRASH_ICON>
        </button>
        <button className="resume-btn" onClick={handleResume}>
          <PLAY_ICON></PLAY_ICON>
        </button>
      </div>
    </>
  );
}
