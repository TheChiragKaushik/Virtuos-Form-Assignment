import React from "react";

function Formfield({
  type,
  name,
  value,
  onChange,
  label,
  min,
  max,
  step,
  maxLength,
}) {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength} // Apply maxLength here for text inputs
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default Formfield;
