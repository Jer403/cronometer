import { useState } from "react";
import { EDIT_ICON, TRASH_ICON } from "../icons/icons";
import { clearSelectedProject, handleToggleModal } from "../utils/utils";
import { useCard } from "../hooks/useCard";

// eslint-disable-next-line react/prop-types
export function ProjectCard({ title, id, totalTime }) {
  const [projectId] = useState(id);
  const { currentProject, setCurrentProject, deleteProject } = useCard();

  const handleProjectClick = async () => {
    setCurrentProject(projectId);
    await clearSelectedProject();
    document.getElementById(id).classList.add("selected");
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    document.getElementById("projectInput").value = title;
    const button = document.getElementById("projectButton");
    button.textContent = "Editar";
    button.dataset.type = "edit";
    button.dataset.id = projectId;

    handleToggleModal();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    const confirmAsk = confirm("Quieres eliminar este projecto?");
    if (currentProject == projectId) setCurrentProject(null);
    if (confirmAsk) deleteProject({ projectId });
  };

  return (
    <>
      <div className="project-card" onClick={handleProjectClick} id={id}>
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
