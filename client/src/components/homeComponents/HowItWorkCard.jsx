import React from "react";

function HowItWorkCard({ workStep, workTitle, worlkDesc }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-semibold group-hover:scale-105 transition">
        {workStep}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{workTitle}</h3>

      <p className="text-gray-600 text-sm leading-relaxed">{worlkDesc}</p>

      <span className="pointer-events-none absolute inset-x-8 bottom-0 h-0.5 bg-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

export default HowItWorkCard;
