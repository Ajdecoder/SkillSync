import React from 'react'
import { Link } from 'react-router-dom'

export const JobPreference = () => {
  return (
    <>
        
      {/* Job Preferences */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Job Preferences</h2>
        <div>
          <Link to="/settings/job-preferences" className="block text-xl font-semibold text-blue-500 hover:underline">
            Manage Job Preferences
          </Link>
          <p className="text-gray-700">Set your preferences for job recommendations and alerts.</p>
        </div>
      </section>

    </>
  )
}
