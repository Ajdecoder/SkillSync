import { Link } from "react-router-dom";

const InfoPage = ({ title, intro, sections, action }) => (
  <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-gray-900 sm:py-20">
    <div className="mx-auto max-w-4xl">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
          SkillSync
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
          {intro}
        </p>
      </header>

      <div className="space-y-5">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {section.title}
            </h2>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              {section.text}
            </p>
          </section>
        ))}
      </div>

      {action && (
        <div className="mt-8 text-center">
          <Link
            to={action.to}
            className="inline-flex items-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {action.label}
          </Link>
        </div>
      )}
    </div>
  </main>
);

export default InfoPage;
