import React from "react";
import Day from "./Day";
export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5" style={{height: '90vh'}}>
      {month.map((row, i) => (
          row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))
      ))}
    </div>
  );
}