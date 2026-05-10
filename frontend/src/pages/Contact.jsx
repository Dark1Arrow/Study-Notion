import React from "react"
import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"
import ReviewSlider from '../components/common/ReviewSlider';

const Contact = () => {
  return (
    <div className="bg-black">
      {/* Contact Section Wrapper */}
      <div className="relative mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-20">
        
        {/* Subtle Background Glow for the Contact Area */}
        <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-purple-600/10 blur-[120px] -z-10 rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[300px] h-[300px] bg-purple-900/10 blur-[120px] -z-10 rounded-full"></div>

        {/* Contact Details - (Make sure to update this component's background too) */}
        <div className="lg:w-[40%] bg-purple-950/20 p-6 lg:p-10 rounded-2xl border border-purple-900/30 h-fit">
          <ContactDetails />
        </div>

        {/* Contact Form Container */}
        <div className="lg:w-[60%] border border-purple-900/30 p-7 lg:p-14 rounded-2xl bg-purple-950/5">
          <ContactForm />
        </div>
      </div>

      {/* Reviews from Other Learner */}
      <div className="my-20 px-5 text-white border-t border-purple-900/20 pt-16">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* Added a bit of spacing for the slider */}
        <div className="mt-12">
          <ReviewSlider />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact