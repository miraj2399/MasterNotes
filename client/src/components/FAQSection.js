import React, { useState } from 'react';

/**
 * Functional component representing a Frequently Asked Questions (FAQ) section.
 */
export default function FAQSection() {
  // State to track which questions are open/collapsed
  const [openQuestions, setOpenQuestions] = useState([]);

  // FAQ data (you can fetch this from an API or define it in your component)
  const faqData = [
    {
      question: 'How can I create notes for a specific lecture session?',
      answer: 'There are 2 ways! Once you log in to your account, you can either click on "Create Note" directly on the dashboard page, or you can navigate to a course and click on the "Create Note" button in the group.',
    },
    {
      question: 'Is it possible to share my notes with classmates?',
      answer: 'Yes! You can share your notes with classmates by using the "Share" option and entering your classmates\' email addresses. This will give them access to view and collaborate on the note(s).',
    },
    {
      question: 'How do I provide feedback on someone else\'s notes?',
      answer: 'To provide feedback on shared notes, open the notes you want to comment on, and use the "Feedback" or "Comment" feature. Leave comments, ask questions, or suggest improvements to promote collaboration.',
    },
    {
      question: 'Are there features to help me organize and search for my notes efficiently?',
      answer: 'Absolutely! You can organize notes by course, lecture session, or custom tags. Additionally, our search functionality allows you to quickly locate specific notes based on keywords or topics.',
    },
    {
      question: 'What happens if I need to edit notes after sharing them?',
      answer: 'If you need to edit shared notes, you can do so. However, it\'s important to communicate any changes with your classmates, as they will be notified of the updates to ensure everyone has access to the latest information.',
    },
    {
      question: 'How do I join a course?',
      answer: 'You will need to be invited by any user that has admin rights for the group. Once they send the group invite to your RUNotes account, you will receive a notification on your dashboard page enabling you to either accept, decline, or mark the notification as read.',
    },
    {
      question: 'What makes RUNotes different from other note sharing platforms?',
      answer: 'Excellent question! RUNotes hyperfocuses on organizing notes based on dates and chronology, which allows users to easily find and access all their content.',
    },
  ];
  
/**
 * FAQ section component.
 * Displays a list of frequently asked questions along with their answers.
 */
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


