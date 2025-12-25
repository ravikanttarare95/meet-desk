import React from "react";

function HomeFeaturesCard({ featureIcon, featureTitle, featureDesc }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-2xl group-hover:bg-violet-600 group-hover:text-white transition">
        {featureIcon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {featureTitle}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">{featureDesc}</p>
    </div>
  );
}

export default HomeFeaturesCard;
