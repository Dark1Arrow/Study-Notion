import Icon from "./IconBtn"

const ConformationModel = ({ modelData }) => {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-10/12 max-w-[350px] rounded-lg border border-richblack-400 bg-gray-800 p-6">
                <p className="text-2xl font-semibold text-gray-50">
                    {modelData?.text1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-gray-200">
                    {modelData?.text2}
                </p>

                <div className="flex items-center gap-x-4">
                    <Icon
                        onClick={modelData?.btn1Handler}
                        text={modelData?.btn1Text}
                    />
                    <button className="cursor-pointer rounded-md bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-gray-2 py-[8px] px-[20px] font-semibold duration-300"
                        onClick={modelData?.btn2Handler}
                    >
                        {modelData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
    return <div></div>
}

export default ConformationModel
