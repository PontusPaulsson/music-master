import React, { useState } from "react";

const Search = ({ searchArtist }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = event => {
    if (event.key === "Enter") searchArtist();
  };

  const handleInputChange = event => {
    setInput(event.target.value);
  };

  return (
    <div>
      <input
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for an Artist"
        value={input}
      />
      <button onClick={() => searchArtist(input)}>Search</button>
    </div>
  );
};

export default Search;
