import React from "react";
import { FooterLink2 } from "../../../data/footerLinks";
import { Link } from "react-router-dom";
import { ImGithub, ImLinkedin2, ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";
import { SiGoogle } from "react-icons/si";

// footer data
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-purple-950/20 border-t border-purple-900/50 mx-7 rounded-3xl mb-10 mt-20">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-purple-200/50 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-purple-900/50">

          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-purple-900/50 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <div className="text-purple-100 font-bold text-xl tracking-tight">
                Study<span className="text-purple-500">Notion</span>
              </div>
              <h1 className="text-purple-50 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              {/* social icons */}
              <div className="flex gap-3 text-lg duration-200 mt-2">
                <ImFacebook className="cursor-pointer hover:text-purple-400 transition-all duration-200" />
                <SiGoogle className="cursor-pointer hover:text-purple-400 transition-all duration-200" />
                <ImTwitter className="cursor-pointer hover:text-purple-400 transition-all duration-200" />
                <ImYoutube className="cursor-pointer hover:text-purple-400 transition-all duration-200" />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-purple-50 font-semibold text-[16px]">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-purple-50 font-semibold text-[16px] mt-7">Support</h1>
              <div className="text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-purple-50 font-semibold text-[16px]">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-purple-50 font-semibold text-[16px] mt-7">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[35%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-purple-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-purple-200/40 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex">
            {BottomFooter.map((ele, ind) => {
              return (
                <div
                  key={ind}
                  className={` ${BottomFooter.length - 1 === ind ? "" : "border-r border-purple-900/50 "}
                    px-3 cursor-pointer hover:text-purple-400 transition-all duration-200`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-1">
            <div className="flex gap-1 justify-center">
              <span> Made with ❤️</span>
              <Link to='https://github.com/Aniruddha-Gade' target="__blank" className="text-purple-100 hover:text-purple-400 underline decoration-purple-900">
                Aniruddha Gade
              </Link>
            </div>
            <span className="opacity-50"> © 2026 StudyNotion</span>
          </div>

          <div className="flex items-center gap-1">
            <a href="https://www.linkedin.com/in/aniruddha-gade-a48800231/" className="text-purple-200 p-2 hover:bg-purple-900/50 hover:text-white rounded-full duration-300" target="_blank" rel="noopener noreferrer">
              <ImLinkedin2 size={17} />
            </a>
            <a href="https://www.github.com/Aniruddha-Gade" className="text-purple-200 p-2 hover:bg-purple-900/50 hover:text-white rounded-full duration-300" target="_blank" rel="noopener noreferrer">
              <ImGithub size={17} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;