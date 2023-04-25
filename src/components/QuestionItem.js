import React from "react";

function QuestionItem({ question , onDeleteClick, onAnswerChange }) {

const { id, prompt, answers, correctIndex } = question;

const options = answers.map((answer, index) => (
<option key={index} value={index}>
{answer}
</option>
));

function handleDeleteClick() {
onDeleteClick(id);
}

function handleAnswerChange(event) {
const newCorrectIndex = parseInt(event.target.value);
onAnswerChange(id, newCorrectIndex);
}

return (
<li>
<h4>Question {id}</h4>
<h5>Prompt: {prompt}</h5>
<label>
Correct Answer:
<select value={correctIndex} onChange={handleAnswerChange}>
{options}
</select>
</label>
<button onClick={handleDeleteClick}>Delete Question</button>
</li>
);
}

export default QuestionItem;