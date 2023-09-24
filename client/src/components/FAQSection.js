import React, { useState } from 'react';

export default function FAQSection() {
  // State to track which questions are open/collapsed
  const [openQuestions, setOpenQuestions] = useState([]);

  // FAQ data (you can fetch this from an API or define it in your component)
  const faqData = [
    {
      question: 'What is Lorem Ipsum?',
      answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Why do we use it?',
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    // Add more FAQ items here
  ];

  return (
    <div className="faq-section">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item border rounded-md mb-2">
          <div
            className={`question p-2 cursor-pointer font-semibold ${
              openQuestions.includes(index) ? 'bg-gray-200' : ''
            }`}
            onClick={() => toggleQuestion(index)}
          >
            {item.question}
          </div>
          {openQuestions.includes(index) && (
            <div className="answer p-2 bg-gray-100">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );

  // Function to toggle the open/collapsed state of a question
  function toggleQuestion(index) {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((i) => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  }
}


