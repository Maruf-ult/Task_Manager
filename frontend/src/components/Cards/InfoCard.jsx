import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded shadow-sm">
      <div className={`w-3 h-3 md:w-4 md:h-4 ${color} rounded-full`}></div>
      <div className="flex flex-col">
        <span className="text-sm md:text-base text-black font-semibold">
          {value}
        </span>
        <span className="text-xs md:text-sm text-gray-500">
          {label}
        </span>
      </div>
    </div>
  )
}

export default InfoCard