import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs = ({data}) => {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((item) => (
  <div key={item.link} className="text-black opacity-50 text-xs font-roboto md:text-sm">
    <Link to={item.link}>{item.name}</Link>
    {item !== data[data.length - 1] && <span className="px-3">/</span>}
  </div>
))}
    </div>
  )
}

export default BreadCrumbs