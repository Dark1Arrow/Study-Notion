import React, { useEffect, useRef, useState,useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Player from "react-player"
import {FiUploadCloud } from "react-icons/fi"

const Upload = ({ name, setValue, register, label, errors, video = false, viewData = null, editData = null }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewScource] = useState(viewData ? viewData : editData ? editData : "")
    const inputRef = useRef(null)

    const onClick = () =>{
        inputRef.current.click()
    }
    
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            previewFile(file)
            setSelectedFile(file)
        }
    }
    
    const {getRootProps,getInputProps,isDragActive} = useDropzone({
        accept: !video
        ? { "image/*": [".jpeg", ".jpg", ".png"] }
        : { "video/*": [".mp4"] },
        onDrop,
    })
    
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewScource(reader.result)
        }
    }

    useEffect(() => {
        register(name, { required: true })
    }, [register])

    useEffect(() => {
        setValue(name, selectedFile)
    }, [selectedFile, setValue])

    return (
        <div className='flex flex-col space-y-2'>
            <label htmlFor={name} className="text-sm text-gray-5">
                {label} {!video && <sup className='text-pink-200'>*</sup>}
            </label>

            <div className={`${isDragActive ? "bg-gray-600" : "bg-gray-700"} flex min-h-[250px]  cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                {previewSource ? (
                    <div>
                        {!video ? (
                            <img src={previewSource} alt="Preview" className='h-full w-full rounded-md object-cover'/>
                        ):(
                            <Player aspectRatio="16:9" playsInline src={previewSource}/>
                        )}
                        {!viewData && (
                            <button
                                type='button'
                                onClick={() => {
                                    setPreviewScource("")
                                    setSelectedFile(null)
                                    setValue(name,null)
                                }}
                                className='mt-3 text-gray-400 underline'
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ):(
                    <div
                        className="flex w-full flex-col items-center p-6"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} ref={inputRef} />
                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                            <FiUploadCloud className='text-2xl text-yellow-50'/>
                        </div>
                        <p className="mt-2 max-w-[200px] text-center text-sm text-gray-200">
                            Drag and drop an {!video ? "image" : "video"}, or click to {" "}
                            <span className='font-semibold text-yellow-50' onClick={onClick}> Browse </span> a file
                        </p>
                        <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-gray-200">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024*576</li>
                        </ul>
                    </div>
                )}
            </div>
            {errors?.[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default Upload
