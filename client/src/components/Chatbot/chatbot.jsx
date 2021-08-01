import React from "react";
import ChatBot from "react-simple-chatbot";

const url = "http://localhost:3000";
//const url = "http://adalov-front.vercel.app";


function Chatbot(props) {
  const config = {
    width: "400px",
    height: "500px",
    floating: true
  };
  const steps = [
    {
      id: "0",
      message: "Hello, Welcome to AdaLov Clothes",
      trigger: "1"
    },
    {
      id: "1",
      message: "Please type your name?",
      trigger: "2"
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hi {previousValue}, This is how I can help you",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        { value: "Shop", label: "Shop", trigger: "5" },
        { value: "Custom T-Shirt", label: "Custom T-Shirt", trigger: "6" },
        { value: "Log In / Register", label: "Log in / Register", trigger: "7" },
        { value: "Contact", label: "Contact", trigger: "8" },

        { value: "Not now", label: "Not now", trigger: "Done" },
      ]
    },
    {
      id: "5",
      component: (<div>Shop: <a href={`${url}/shop`}>Click Here</a></div>),
      asMessage: true
    },
    {
      id: "6",
      component: (<div>Custom T-Shirt: <a href={`${url}/design`}>Click Here</a></div>),
      asMessage: true
    },
    {
      id: "7",
      component: (<div>Log in or Register here: <a href={`${url}/auth`}>Click Here</a></div>),
      asMessage: true
    },
    {
      id: "8",
      component: (<div>Here is our E-Mail: <a href="mailto: ecommerceg6@gmail.com">ecommerceg6@gmail.com</a></div>),
      asMessage: true
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true
    }
  ];
  return <ChatBot steps={steps} {...config} />;

}
export default Chatbot;