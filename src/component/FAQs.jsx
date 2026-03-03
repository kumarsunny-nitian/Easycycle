import React from 'react'

const FAQs = () => {
  const faqs = [
    {
      question: "🚲 What is EasyCycle?",
      answer:
        "EasyCycle is a web-based application that allows college students to book, track, and manage shared cycles on campus when their personal cycle is unavailable.",
    },
    {
      question: "💳 Is it free to use?",
      answer:
        "Yes, most features are free for registered students. However, some colleges may implement a nominal usage fee depending on the policy.",
    },
    {
      question: "📱 Do I need to download any app?",
      answer:
        "No, EasyCycle runs entirely on the web. You can access it from any device with a browser — desktop or mobile.",
    },
    {
      question: "🕒 How long can I use a cycle?",
      answer:
        "Usage time may vary depending on your college's rules. Usually, short-term use is encouraged to ensure availability for all students.",
    },
    {
      question: "🔐 How is my data stored?",
      answer:
        "We use Firebase for secure authentication and data storage. Your personal data and usage history are safely managed and not shared with any third party.",
    },
    {
      question: "❓ Who do I contact if I face an issue?",
      answer:
        "You can use the in-app contact form or reach out to your campus's cycle support staff for assistance.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-20">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="text-gray-700 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
