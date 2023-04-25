import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const questions = await response.json();
        setQuestions(questions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestions();
  }, []);

  async function handleDeleteClick(id) {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" });
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAnswerChange(id, correctIndex) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correctIndex }),
      });
      const updatedQuestion = await response.json();
      const updatedQuestions = questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      );
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddQuestion(question) {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      });
      const newQuestion = await response.json();
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error(error);
    }
  }

  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={() => handleDeleteClick(q.id)}
      onAnswerChange={(correctIndex) => handleAnswerChange(q.id, correctIndex)}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
      <QuestionForm onAddQuestion={handleAddQuestion} />
    </section>
  );
}

export default QuestionList;