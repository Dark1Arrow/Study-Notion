import React, { use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection, updateSection } from '../../../../../redux/api/operation/courseDetailsApi'
import { setCourse } from '../../../../../redux/slices/courseSlice'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import SubSectionModel from './SubSectionModel'
import ConfirmationModel from "../../../../common/ConformationModel"

const NestedView = ({ handleChangeEditSectionName }) => {

    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const dispatch = useDispatch()

    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [confirmationDetail, setConfirmationDetail] = useState(null)

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({ sectionId, courseId: course._id, token })
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationDetail(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)
            const updatedCourse = { ...course, updatedCourseContent }
            dispatch(setCourse(updatedCourseContent))
        }
        setConfirmationDetail(null)
    }

    return (
        <>
            <div
                className='rounded-2xl bg-gray-700 p-6 px-8'
                id='nestedviewContainer'
            >
                {course?.courseContent?.map((section) => (
                    <details key={section._id} id={section._id} open>
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-gray-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-gray-50" />
                                <p className="font-semibold text-gray-50">
                                    {section.sectionName}
                                </p>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit className="text-xl text-gray-300" />
                                </button>

                                <button
                                    onClick={() =>
                                        setConfirmationDetail({
                                            text1: "Delted the Section",
                                            text2: "All the lecture of this Section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationDetail(null)
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className='text-xl text-gray-300' />
                                </button>

                                <span className="font-medium text-gray-300">|</span>
                                <AiFillCaretDown className='text-xl text-gray-300' />
                            </div>
                        </summary>

                        <div className="px-6 pb-4">
                            {section.subSection.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-gray-600 py-2"
                                >
                                    <div className="flex items-center gap-x-3 py-2 ">
                                        <RxDropdownMenu className='text-2xl text-gray-300' />
                                        <p>
                                            {data.title}
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center gap-x-3"
                                        onclick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onclick={() => setEditSubSection({ ...data, sectinId: section._id })}
                                        >
                                            <MdEdit className='text-xl text-gray-300' />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setConfirmationDetail({
                                                    text1: "Delete this subsection",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationDetail(null),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className='text-xl txt-gray-300' />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-3 cursor-pointer flex items-center gap-x-1 text-yellow-50"
                            >
                                <FaPlus className="text-lg" />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {
                addSubSection ? (
                    <SubSectionModel
                        modelData={addSubSection}
                        setModelData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <SubSectionModel
                        modelData={viewSubSection}
                        setModelData={setViewSubSection}
                        add={true}
                    />
                ) : editSubSection ?
                    (
                        <SubSectionModel
                            modelData={editSubSection}
                            setModelData={setEditSubSection}
                            add={true}
                        />
                    ) : (<></>)
            }

            {
                confirmationDetail ? (
                    <ConfirmationModel modelData={confirmationDetail}/>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default NestedView
