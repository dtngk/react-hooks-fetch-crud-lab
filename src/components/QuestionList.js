import React, { useEffect, useState }  from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  function deleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((reponse) => reponse.json())
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id))
      }); 
  }

  function changeAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ correctIndex }),
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        const newQuestions = questions.map((question) => {
          if (question.id === data.id){
            return data;
          }

          return question;
        });

        setQuestions(newQuestions);
      });
  }

  const displayQuestions = questions.map((question) => (
    <QuestionItem key={question.id} question={question} deleteQuestion={deleteQuestion} changeAnswer={changeAnswer}/>)
  ) 

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {displayQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
