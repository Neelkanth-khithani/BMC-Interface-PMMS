import React from "react";

const DateSelector = ({ selectedDate = "", onDateChange }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg w-full max-w-sm">
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={onDateChange}
        className="border border-gray-300 rounded-md p-2 w-full"
        aria-label="Select a date"
      />
    </div>
  );
};

export default DateSelector;