import React from 'react'
import { Link } from 'react-router-dom'

export const BlockCompanies = () => {
  return (
    <>
        

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Block Companies</h2>
        <div>
          <Link to="/settings/block-companies" className="block text-xl font-semibold text-blue-500 hover:underline">
            Block Companies
          </Link>
          <p className="text-gray-700">Manage the companies you want to block from contacting you.</p>
        </div>
      </section>


    </>
  )
}
