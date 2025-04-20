import React from 'react';
import ContactForm from '../components/ContactForm.jsx';

const Contact = () => {
  const email = "anushree025btcseai23@igdtuw.ac.in";

  return (
    <section
      id="contact"
      className="border-b border-neutral-900 pb-20"
    >
      <h1 className="my-10 text-center text-4xl">Get in Touch</h1>
      <div className="text-center tracking-tighter">
        <p className="my-4 text-gray-300">
          You can also reach me at:&nbsp;
          <a
            href={`mailto:${email}`}
            className="text-purple-300 hover:underline"
          >
            {email}
          </a>
        </p>
      </div>
      <ContactForm />
    </section>
  );
};

export default Contact;
