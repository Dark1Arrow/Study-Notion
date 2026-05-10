import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-purple-950/40 p-4 lg:p-8 border border-purple-900/30 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.2)]">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-[4px] p-3 transition-all duration-300 hover:bg-purple-900/20 rounded-xl"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              {/* Icon with themed purple color */}
              <div className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                <Icon size={25} />
              </div>

              <h1 className="text-lg font-semibold text-purple-50">
                {ele?.heading}
              </h1>
            </div>

            {/* Description - Themed Purple-Gray */}
            <p className="font-medium text-purple-200/60 text-sm">
              {ele?.description}
            </p>
            
            {/* Details - High visibility */}
            <p className="font-bold text-purple-100 text-sm">
              {ele?.details}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails