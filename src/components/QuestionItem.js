import React from "react";

function QuestionItem({ question, deleteQuestion, changeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function onAnswerChange(event){
    changeAnswer(id, parseInt(event.target.value));
  }    

  function onDeleteClick(){
    deleteQuestion(id);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={onAnswerChange}>{options}</select>
      </label>
      <button onClick={onDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
