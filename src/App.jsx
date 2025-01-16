import "./App.css";
import "./Modal.css";
import { useEffect, useRef } from "react";
import { useCard } from "./hooks/useCard.jsx";
import { useTimer } from "./hooks/useTimer.jsx";
import { PLUS_ICON } from "./icons/icons.jsx";
import { ProjectCard } from "./components/ProjectCard.jsx";
import { Card } from "./components/Card.jsx";
import {
  formatMillisToAdjustedHMS,
  handleToggleModal,
  selectProject,
} from "./utils/utils.js";

function App() {
  const cardId = useRef(0);

  const { cards, addNewProject, currentProject, updateProjectTitle } =
    useCard();

  const addProjectInput = useRef();

  useEffect(() => {
    selectProject(currentProject);
  }, [currentProject, cards]);

  const { activated, timerClick } = useTimer();

  const handleModal = () => {
    addProjectInput.value = "";
    const button = document.getElementById("projectButton");
    button.textContent = "Agregar";
    button.dataset.id = "add";

    handleToggleModal();
  };

  const handleClickProject = () => {
    if (addProjectInput.current.value == "") {
      return;
    }
    const button = document.getElementById("projectButton");

    if (button.dataset.type == "edit") {
      updateProjectTitle({
        projectId: button.dataset.id,
        title: addProjectInput.current.value,
      });
      addProjectInput.current.value = "";
      handleToggleModal();
    } else {
      const id = Math.floor(Math.random() * 10000);
      const title = addProjectInput.current.value;
      addNewProject({ id, title, projectCards: [] });
      addProjectInput.current.value = "";
      handleToggleModal();
    }
  };

  return (
    <>
      <div
        className="modal-container"
        id="modalContainer"
        style={{ display: "none" }}
      >
        <div className="modal">
          <h2 className="modal-title">Proyecto</h2>
          <input
            ref={addProjectInput}
            type="text"
            placeholder="Nombre del projecto"
            className="modal-input counterInput"
            id="projectInput"
          />
          <button className="modal-btn" onClick={handleToggleModal}>
            Atras
          </button>
          <button
            className="modal-btn add-btn"
            id="projectButton"
            onClick={handleClickProject}
            data-type="add"
          >
            Agregar
          </button>
        </div>
      </div>
      <main>
        <aside className="input-container input-container-left">
          <p className="top-input-container-text">PROYECTOS</p>
          <div className="projects">
            {cards.length > 0 ? (
              cards.map(({ title, id, projectCards }) => (
                <ProjectCard
                  key={`r-${(cardId.current += 1)}`}
                  id={id}
                  title={title}
                  totalTime={formatMillisToAdjustedHMS(
                    projectCards.reduce(
                      (sum, item) => sum + Number(item.dateinfo),
                      0
                    )
                  )}
                ></ProjectCard>
              ))
            ) : (
              <div>No tienes proyectos</div>
            )}
          </div>
          <button className="close-btn add-project" onClick={handleModal}>
            <PLUS_ICON></PLUS_ICON>
          </button>
        </aside>
        <main className="card-container">
          {currentProject ? (
            cards.map((item) => {
              if (item.id == currentProject) {
                return item.projectCards.length > 0 ? (
                  item.projectCards.map(({ id, title, dateinfo }) => {
                    return (
                      <Card
                        key={`r-${(cardId.current += 1)}`}
                        id={id}
                        title={title}
                        dateinfo={dateinfo}
                      ></Card>
                    );
                  })
                ) : (
                  <div key="no-notes" style={{ fontSize: "24px" }}>
                    No hay ninguna nota
                  </div>
                );
              }
            })
          ) : (
            <div style={{ fontSize: "24px" }}>Selecciona un projecto</div>
          )}
        </main>
        <aside className="input-container">
          <p className="message-log" id="message-log"></p>
          <input
            type="text"
            placeholder="¿En qué estas trabajando?"
            className="counterInput"
            id="counterInput"
          />
          <p className="counterText" id="counterText">
            00:00:00
          </p>
          <button onClick={timerClick} className="activateBtn">
            {activated == true || activated == null ? "Detener" : "Iniciar"}
          </button>
        </aside>
      </main>
    </>
  );
}

export default App;
