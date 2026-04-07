import { useState } from "react";
import BackButton from "../components/BackButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const faqs = [
    {
      question: "I forgot my password. What should I do?",
      answer: "On the Login page, press \"Forgot Password?\" and follow the steps to reset it!"
    },
    {
      question: "I'm getting an error message when logging in",
      answer: "Please make sure you have entered your email and password correctly, if you forgot your password, you can reset it by pressing \"Forgot Password?\" \n\nIf issues persist, please feel free to contact us."
    },
    {
      question: "My password isn't validating",
      answer: "Please make sure that your password includes at least 8 characters, inluding a number and a special character."
    },
    {
      question: "Can I use UEats if I'm not a student?",
      answer: "Yes! You can still use UEats to view restaurants and menus as a guest, but you won't be able to save favourite restaurants, write recommendations/reviews, or set your preferences."
    },
    {
      question: "How do I update my account information?",
      answer: "Once logged in, press the profile icon and press \"Edit Profile\". From there, you can change your profile picture, first name, last name, and email."
    },
    {
      question: "How do I update my preferences?",
      answer: "Once logged in, press the profile icon and press \"My Preferences\". From there, you can set your dietary restrictions, allergens, and price range. \nMake sure to save your preferences!"
    },
    {
      question: "How do I favourite a restaurant?",
      answer: "When on your home page, explore page, or a restaurant's page, press on the red heart to favourite the restaurant!"
    },
    {
      question: "How do I write a review or recommendation?",
      answer: "On a restaurant's page, go to the \"Recommendations\" or \"Reviews\" section, and press the \"Recommend Something\" or \"Add a Review\" button!"
    },
    {
      question: "Why can't I find a specific restaurant?",
      answer: "UEats currently only shows restaurants on the University of Calgary campus. We may expand our services to other locations or universities in the future!"
    },
    {
      question: "How can I contact support?",
      answer: "To contact UEats support, please email us at support@ueats.ca"
    }
  ];

function Accordion({question, answer}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#eee] my-8 rounded-md">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-4 text-left text-[1rem] md:text-[1.4rem] px-4">
        {question}
        <ArrowDropDownIcon className={`!text-4xl transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="w-full bg-[#fff] px-4 py-4 border-2 border-solid border-[#eee] rounded-b-md">
          <p className="text-[#726F6F] text-[0.9rem] md:text-[1.2rem] whitespace-pre-line">{answer}</p>
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
      <img src="/src/assets/ueats_logo.png" alt="UEats logo" className="w-[12rem] h-[9rem] md:w-[16rem] md:h-[12rem] object-contain" />
      <h1 className="text-[2rem] font-bold my-4">Help & FAQ</h1>
      <div className="w-full max-w-[48rem]">
        {faqs.map((faq) => (
          <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </main>
    
  );
}