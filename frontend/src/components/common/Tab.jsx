import React from 'react'

const Tab = ({ tabData, fields, setField }) => {
    return (
        <div 
            className='flex bg-purple-950/40 border border-purple-900/50 p-1 gap-x-1 my-6 rounded-full max-w-max backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
        >
            {
                tabData.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setField(tab.type)}
                        className={`${fields === tab.type
                            ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                            : "bg-transparent text-purple-200/60 hover:text-purple-100 hover:bg-purple-900/20"
                            } py-2 px-6 rounded-full transition-all duration-300 font-medium text-sm`}
                    >
                        {tab?.tabName}
                    </button>
                ))
            }
        </div>
    )
}

export default Tab