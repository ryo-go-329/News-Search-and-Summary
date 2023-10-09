import React, { useState } from 'react'
import emailjs from 'emailjs-com';

const userID = import.meta.env.VITE_USER_ID;
const serviceID = import.meta.env.VITE_SERVICE_ID;
const templateID = import.meta.env.VITE_TEMPLATE_ID;



const Contact = () => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");
    const sendMail = () => {
        if (
            userID !== undefined &&
            serviceID !== undefined &&
            templateID !== undefined
        ) {
            // init(userID);
        
            const template_param = {
                from_name: name,
                from_email:email,
                subject: subject,
                message: message,
            };
            emailjs.send(serviceID,templateID,template_param,userID)
                .then(() => {
                    window.alert("Send comlete");
                    setName("");setEmail("");setMessage("");setSubject("");
                }, (error) => {
                    console.log(error.text)
                });
        }};

    const handleSend = (e) => {
        e.preventDefault();
        sendMail();
    }
    const disableSend = name === '' || email === '' || message === ''; 
  return (
    <div>
      <h1>Send me a messeage</h1>
      <p>aa</p>
      <form>
    {/* <form onClick={handleSend}> */}
        <input 
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            className='input_form'
        />
        <input 
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='input_form'
        />
        <input 
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder='Subject'
            className='input_form'
        />
        <input 
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Message'
            className='input_form'
        />
        <button className='bg-blue-200' onClick={handleSend} disabled={disableSend}>Send</button>
      </form>
    </div>
  )
}

export default Contact
