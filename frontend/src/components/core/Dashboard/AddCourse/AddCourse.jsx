import React, { useEffect } from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='flex w-full items-start gap-x-6'>
      <div className='flex flex-1 flex-col'>
        <h1 className="mb-14 text-3xl font-medium text-gray-5 font-boogaloo text-center lg:text-left">
            Add Course
        </h1>
        <div className='flex-1'>
          <RenderSteps/>
        </div>
      </div>

      <div className="sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-6 ">
        <p  className="mb-8 text-lg text-gray-50">⚡ Course Upload Tips</p>
        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-gray-50">
          <li>Set the Course prize option or make it free.</li>
          <li>Standerd size of course thumbnail is 1024*576.</li>
          <li>Video section control the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add topics in the course builder section to create lesson , quizzes, and assignments.</li>
          <li>Information from the additional data section shows up on the course single page.</li>
          <li>Make announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  )
}

export default AddCourse
