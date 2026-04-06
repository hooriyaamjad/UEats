import { useState } from "react";
import BackButton from "../components/BackButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const faqs = [
    {
      question: "a",
      answer: "b"
    },
    {
      question: "c",
      answer: "d"
    },
    {
      question: "e",
      answer: "f"
    },
    {
      question: "g",
      answer: "h"
    },
    {
      question: "i",
      answer: "j"
    },
  ];

function Accordion({question, answer}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#eee] my-8">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-4 text-left text-[1.2rem] px-4">
        {question}
        <ArrowDropDownIcon className={`!text-4xl transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="w-full bg-[#fff] px-4 py-4 border-2 border-solid border-[#eee]">
          <p className="text-[#726F6F] text-[1.1rem]">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Help() {
  
  return (
    <main className="min-h-screen flex flex-col items-center bg-white px-8 py-12">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] md:w-[24rem] md:h-[18rem] object-contain" />
      <h1 className="text-[2rem] font-bold my-8">Help & FAQ</h1>
      <div className="w-full max-w-[40rem]">
        {faqs.map((faq) => (
          <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </main>
    
  );
}