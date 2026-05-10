import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import Img from "../components/common/Img"
import ReviewSlider from './../components/common/ReviewSlider';

import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarient"

const About = () => {
  return (
    <div className="bg-black"> {/* Entire page wrapper now solid black */}
      
      {/* Hero Section - Updated to Deep Purple background */}
      <section className="bg-purple-950/20 border-b border-purple-900/30">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <motion.header
            className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]"
          >
            <motion.p
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
            > Driving Innovation in Online Education for a
              <HighlightText text={"Brighter Future"} />
            </motion.p>

            <motion.p
              variants={fadeIn('up', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-3 text-center text-base font-medium text-purple-200/60 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </motion.p>
          </motion.header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          {/* Banner Images - Added themed border/shadow */}
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5 px-4">
            <Img src={"/home/coding bg5.jpg"} alt="" className="rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)] border border-purple-800/30" />
            <Img src={"/home/coding bg5.jpg"} alt="" className="rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)] border border-purple-800/30" />
            <Img src={"/home/coding bg5.jpg"} alt="" className="rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)] border border-purple-800/30" />
          </div>
        </div>
      </section>

      {/* Quote Section - Updated border */}
      <section className="border-b border-purple-900/20">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-purple-100">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      {/* Story, Vision & Mission Section */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-purple-100/70">
          
          {/* Founding Story */}
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <motion.div
              variants={fadeIn('right', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="my-24 flex lg:w-[50%] flex-col gap-10">
              {/* Updated Heading Gradient to Purple/Pink */}
              <h1 className="bg-gradient-to-br from-[#bc61f3] via-[#8b23e1] to-[#4e0ca4] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-purple-200/60 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-purple-200/60 lg:w-[95%]">
                As experienced educators ourselves, we envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </motion.div>

            <motion.div
             variants={fadeIn('left', 0.1)}
             initial='hidden'
             whileInView={'show'}
             viewport={{ once: false, amount: 0.1 }}
            >
              <Img
                src={"/home/coding bg5.jpg"}
                alt="FoundingStory"
                className="shadow-[0_0_40px_0] shadow-purple-600/20 rounded-2xl border border-purple-500/20"
              />
            </motion.div>
          </div>

          {/* Vision & Mission - Updated Gradients to match theme */}
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between pb-20">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-purple-200/60 lg:w-[95%]">
                We set out on a journey to create an e-learning platform that would revolutionize the way people
                learn, combining cutting-edge technology with engaging content.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-purple-200/60 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Purple tint */}
      <div className="bg-purple-950/10 py-10 border-y border-purple-900/20">
         <StatsComponenet />
      </div>

      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
      </section>

      {/* Reviews Section */}
      <div className="my-20 px-5 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  )
}

export default About