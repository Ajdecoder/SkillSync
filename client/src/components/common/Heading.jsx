import React from "react"

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <main className='heading'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </main>
    </> 
  )
}

export default Heading
