import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-purple-900/40 bg-purple-950/5 text-purple-200/60 rounded-2xl p-7 lg:p-14 flex gap-3 flex-col shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      
      {/* Main Heading - Clean White */}
      <h1 className="text-4xl leading-10 font-semibold text-white">
        Got an Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>

      {/* Subheading - Themed Purple-Gray */}
      <p className="text-base font-medium">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      {/* Form Section */}
      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;