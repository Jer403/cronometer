import { useState } from "react";
import { EDIT_ICON, TRASH_ICON } from "../icons/icons";
import { openModalWithPreset } from "../utils/utils";
import { useCard } from "../hooks/useCard";

// eslint-disable-next-line react/prop-types
export function ProjectCard({ title, id, totalTime, className }) {
  const [projectId] = useState(id);
  const { currentProject, setCurrentProject, deleteProject } = useCard();

  const handleProjectClick = async () => {
    setCurrentProject(projectId);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    openModalWithPreset({ type: "edit", input: title, id: projectId });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    const confirmAsk = confirm("Quieres eliminar este projecto?");
    if (currentProject == projectId) setCurrentProject(null);
    if (confirmAsk) deleteProject({ projectId });
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
