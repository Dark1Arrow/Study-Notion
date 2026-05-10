import React from "react";
import ContactUsForm from '../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      {/* Heading - Clean White */}
      <h1 className="text-center text-4xl font-semibold text-white">
        Get in Touch
      </h1>
      
      {/* Subheading - Themed Purple-Gray */}
      <p className="text-center text-purple-200/60 mt-3 text-base">
        We&apos;d love to hear from you. Please fill out this form below.
      </p>
      
      {/* Form Container */}
      <div className="mt-12 mx-auto w-full max-w-[600px] p-8 rounded-2xl bg-purple-950/10 border border-purple-900/20 shadow-[0_0_50px_rgba(0,0,0,0.2)]">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;