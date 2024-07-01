'use client'
import React from 'react';
import Link from "next/link";


export default function ThinkModule() {

  
  return (
    <main
      className={`flex min-h-screen  items-center  p-24`}
    >
      <div className="number-wrapper">
        <label htmlFor="number-text">Think Number between 1-50 </label>
        {/* <input type="number" name="number-text" title="Enter Number" value={ number} onChange={handleChange} /> */}
      </div>
      <Link href={`/think/second`} >
      <button type="button">Next</button>
      </Link>
    </main>
  );
}
