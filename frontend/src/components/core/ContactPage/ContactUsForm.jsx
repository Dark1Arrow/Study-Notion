import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from '../../../../data/countryCode.json'

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      // API call logic here
      setLoading(false)
    } catch (error) {
      console.log("ERROR WHILE CONTACT US - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* First Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-purple-50 text-sm">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 text-purple-50 placeholder:text-purple-200/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-pink-400">
              Please enter your name.
            </span>
          )}
        </div>
        
        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-purple-50 text-sm">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 text-purple-50 placeholder:text-purple-200/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-purple-50 text-sm">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 text-purple-50 placeholder:text-purple-200/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-pink-400">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-purple-50 text-sm">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 text-purple-50 focus:outline-none focus:border-purple-500 transition-all duration-200"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code} className="bg-zinc-900">
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 text-purple-50 placeholder:text-purple-200/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter your Phone Number." },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-pink-400">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-purple-50 text-sm">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 text-purple-50 placeholder:text-purple-200/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-pink-400">
            Please enter your Message.
          </span>
        )}
      </div>

      {/* Updated Themed Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-xl bg-purple-600 px-6 py-3 text-center text-[16px] font-bold text-white shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] 
         ${!loading &&
          "transition-all duration-300 hover:scale-[0.98] hover:bg-purple-500 hover:shadow-purple-500/40"
          } disabled:bg-purple-900/50 sm:text-[16px]`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm