import React, {useState, useEffect} from 'react';
import './App.css';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';
import InputZone from './InputZone';

const CommunicationZone = () => {
  const [state, setState] = React.useState({
    value: '',
    disposable: '',
    history: ['How can I help?'],
  });
  const stateRef = React.useRef(state);

  const [answersBasic, setAnswersBasic] = useState([])
  const [answersAdvanced, setAnswersAdvanced] = useState([])
  const [answersAdjust, setAnswersAdjust] = useState([])

  useEffect(() => {
      fetch("http://localhost:8080/api/answers")
      .then(res => res.json())
      .then(data => {
          setAnswersBasic(data.answersBasic)
          setAnswersAdvanced(data.answersAdvanced)
          setAnswersAdjust(data.answersAdjust)
      })
  }, [])

  function handleChange(event) {
    setState({
      ...state,
      value: event.target.value,
    });
  }

  function handleSubmit(event) {
    if (event.key === 'Enter') {
      const newState = {
        ...state,
        value: '',
        disposable: event.target.value,
        history: [...state.history, event.target.value],
      };
      setState(newState);
      stateRef.current = newState;

      setTimeout(dialogueEngine, 3000);
    
    }
    cleanHistory();
  }

  function dialogueEngine() {
      const {disposable, history} = stateRef.current

    if (disposable.length <= 7) {
      let response =
        answersAdjust[Math.floor(Math.random() * answersAdjust.length)];
      setState({
        ...stateRef.current,
        history: [...history, response],
      });
    } else if (
      history.length <= 3 &&
      disposable.length > 6
    ) {
      let response =
        answersBasic[Math.floor(Math.random() * answersBasic.length)];
      setState({
        ...stateRef.current,
        history: [...history, response],
      });
    } else if (history.length >= 4) {
      let response =
        answersAdvanced[Math.floor(Math.random() * answersAdvanced.length)];
      setState({
        ...stateRef.current,
        history: [...history, response],
      });
    }
  }

  function cleanHistory() {
    const tempHistory = state.history;
    let newHistory = [];
    if (state.history.length > 8) {
    tempHistory.splice(0, 2);
      newHistory = tempHistory;
      setState({
        ...state,
        history: newHistory,
      });
    }
  }

  return (
    <div className="chatHost innerShadow">
      <ContactWindow />
      <ChatZone history={state.history} />
      <InputZone
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={state.value}
      />
    </div>
  );
};

export default CommunicationZone;