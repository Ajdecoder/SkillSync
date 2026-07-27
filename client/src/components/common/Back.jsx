import React from "react"

const Back = ({ name, title, cover }) => {
  return (
    <section className="relative min-h-[320px] overflow-hidden bg-slate-950 text-white">
      {/* {cover && (
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )} */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

      <div className="container relative z-10 mx-auto flex min-h-[320px] flex-col items-start justify-center px-6 py-20">
        <span className="mb-4 inline-block rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
          {name}
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  )
}

export default Back