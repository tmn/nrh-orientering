import { useState } from "react";
import "./App.css";

const TaskType = {
  QUESTION: "Question",
  NO_QUESTION: "NoQuestion",
};

const tasks = [
  {
    title: "Punktorientering 1",
    description: "...",
    answer: "053 355",
    maps_url: "https://maps.app.goo.gl/a1VGvzRdjzW5kLwx7",
    type: TaskType.QUESTION,
  },
  {
    title: "Punktorientering 2",
    description: "...",
    answer: "055 358",
    next: "053 363",
    maps_url: "https://maps.app.goo.gl/jdh1ykFsogPgCTcZ8",
    type: TaskType.QUESTION,
  },
  {
    title: "Orientering 1",
    description: "...",
    answer: "Østmarkkapellet",
    next: "055 364",
    maps_url: "https://maps.app.goo.gl/xy6EG1KamNWn2Tfi9",
    type: TaskType.NO_QUESTION,
  },
  {
    title: "Orientering 2",
    description: "",
    answer: "Røde Kors -hytta",
    next: "059 360",
    maps_url: "https://maps.app.goo.gl/PmTfCzNUk8kpKKN88",
    type: TaskType.NO_QUESTION,
  },
  {
    title: "Orientering 3",
    description: "...",
    answer: "enden på stien og inn på grusvei(?)",
    next: "057 359",
    maps_url: "https://maps.app.goo.gl/gxZHdmD3uJosT2ci7",
    type: TaskType.NO_QUESTION,
  },

  {
    title: "Orientering 4",
    description: "...",
    answer: "nedre ende på Trollvannet",
    next: "042 353",
    maps_url: "https://maps.app.goo.gl/XKTQ9kobuU9NL98d9",
    type: TaskType.NO_QUESTION,
  },

  {
    title: "Orientering 5",
    description: "...",
    answer: "Mål!!!",
    next: "",
    maps_url: "https://maps.app.goo.gl/g6W78PVHZudqJ6HFA",
    type: TaskType.NO_QUESTION,
  },
];

function AnswerCorrect(task) {
  return (
    <div className={`answer-correct`}>
      <p>Fasit: {task.answer}</p>

      {task.next ? (
        <p>
          Du skal videre til <strong>{task.next}</strong>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

function AnswerWrong(task) {
  return (
    <div className={`answer-wrong`}>
      <p>Svaret var dessverre feil. Prøv igjen</p>
    </div>
  );
}

function TaskQuestion(task) {
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [force, setForce] = useState(false);

  function check_answer(force) {
    force = force || false;
    if (force) {
      return true;
    }
    return (
      `${answer}`.replace(/\s/g, "").toUpperCase() ===
      task.answer.replace(/\s/g, "").toUpperCase()
    );
  }

  function toggle_show_answer() {
    setShowAnswer(!showAnswer);
  }

  function handle_check_answer() {
    if (force) {
      setForce(false);
    }
    if (!showAnswer) {
      setShowAnswer(true);
    }
  }

  function handle_input_change(event) {
    if (force) {
      setForce(false);
    }
    if (showAnswer) {
      setShowAnswer(false);
    }
    setAnswer(event.target.value);
  }

  function force_show_answer() {
    if (!showAnswer) {
      setShowAnswer(true);
    }

    if (force) {
      setForce(false);
      setShowAnswer(false);
    } else {
      setForce(true);
    }
  }

  return (
    <div className="item">
      <div>
        <h2>{task.title}</h2>
        <div>
          <p>
            Orienter deg til dette punktet på kartet og les av koordinater:{" "}
            <a href={`${task.maps_url}`}>Google Maps Pin</a>
          </p>
          <div>
            <input
              type="text"
              className="coordinate-input"
              onInput={handle_input_change}
            />
            <div className="button-group--main">
              <button
                className="button-group-btn button-group-btn--small"
                onClick={force_show_answer}
              >
                Se fasit
              </button>
              <button
                className="btn-prim button-group-btn"
                onClick={handle_check_answer}
              >
                Sjekk svar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="result-container">
        {showAnswer ? (
          check_answer(force) ? (
            <AnswerCorrect {...task} />
          ) : (
            <AnswerWrong {...task} />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function TaskNoQuestion(task) {
  const [showAnswer, setShowAnswer] = useState(false);

  function handle_show_answer() {
    setShowAnswer(!showAnswer);
  }

  return (
    <div className="item">
      <h2>{task.title}</h2>
      <div>
        <button onClick={handle_show_answer}>Kommet fram? Se svar</button>
      </div>
      {showAnswer ? (
        <div className="answer-general">
          <p>
            Dette var {task.answer}. Se i{" "}
            <a href={`${task.maps_url}`}>Google Maps</a>.
          </p>
          {task.next ? (
            <p>
              Orienter deg videre til: <strong>{task.next}</strong>
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Task(task) {
  if (task.type === TaskType.QUESTION) {
    return <TaskQuestion {...task} />;
  }
  return <TaskNoQuestion {...task} />;
}

function App() {
  return (
    <>
      <div className="topBar"></div>
      <header className="header">
        <div className="header-container">
          <h1>Orienteringsprøve</h1>
        </div>
      </header>
      <div className="container">
        {tasks.map((task, id) => (
          <Task key={`task-${id}`} {...task} />
        ))}
      </div>
    </>
  );
}

export default App;
