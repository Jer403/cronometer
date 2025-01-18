import { useState } from "react";
import { EDIT_ICON, TRASH_ICON } from "../icons/icons.jsx";
import { openModalWithPreset, showMessage } from "../utils/utils.js";
import { useCard } from "../hooks/useCard.jsx";

// eslint-disable-next-line react/prop-types
export function ProjectCard({ title, id, totalTime, className }) {
  const [projectId] = useState(id);
  const { currentProject, setCurrentProject, deleteProject, activated } =
    useCard();

  const handleProjectClick = async () => {
    if (activated == true || activated == null) {
      showMessage("Hay un cronometro activo!");
      return;
    }
    setCurrentProject(projectId);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    openModalWithPreset({ type: "edit", input: title, id: projectId });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    const confirmAsk = confirm("Quieres eliminar este projecto?");
    if (confirmAsk) {
      if (currentProject == projectId) setCurrentProject(null);
      deleteProject({ projectId });
    }
  };

  return (
    <>
      <div
        className={`project-card ${className}`}
        onClick={handleProjectClick}
        id={id}
      >
        <p className="project-card-title">{title}</p>
        <p className="project-card-time">{totalTime}</p>
        <div className="project-card-divider"></div>
        <button
          className="project-card-btn project-card-edit"
          onClick={handleEditClick}
        >
          <EDIT_ICON></EDIT_ICON>
        </button>
        <button
          className="project-card-btn project-card-del"
          onClick={handleDeleteClick}
        >
          <TRASH_ICON></TRASH_ICON>
        </button>
      </div>
    </>
  );
}
