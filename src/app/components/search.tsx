"use client";
import { useEffect, useState, useMemo, memo } from "react";

const libraries = ["places"];

export default function Search() {
  const [input, setInput] = useState("");

  const handleKeyStroke = async (e: React.FormEvent<HTMLInputElement>) => {
    const { Place, AutocompleteSessionToken, AutocompleteSuggestion } =
      (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
    console.log((e.target as HTMLInputElement).value);
  };

  return (
    <div className="flex justify-center mt-8">
      <input
        id="name"
        name="name"
        type="text"
        value={input}
        onKeyUp={(e) => handleKeyStroke(e)}
        placeholder="Enter UK Postcode"
        className="block w-[480px] h-[48px] -mr-16 rounded-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-roofone-green-bg sm:text-sm/6"
      />
      <button
        type="button"
        className="rounded-r-full -ml-24 w-48 bg-roofone-green-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Calculate rating
      </button>
    </div>
  );
}
