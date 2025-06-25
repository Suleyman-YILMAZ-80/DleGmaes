'use client';

import { useEffect, useState } from "react";
import champions from "../../../data/champions.json";
import { Champion } from "../../types/champions";
import { getRandomChampion } from "@/utils/getRandomChampion";
import { compareChampions } from "@/utils/compareChampions";

type ComparisonResult = ReturnType<typeof compareChampions>[0];

export default function HomePage() {
  const [targetChampion, setTargetChampion] = useState<Champion | null>(null);
  const [guessName, setGuessName] = useState("");
  const [guesses, setGuesses] = useState<{ champion: Champion; result: ComparisonResult[] }[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);  
  const[showpopup, setShowPopup] = useState(false);
  const [regionInput, setRegionInput] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [speciesInput, setSpeciesInput] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);

  const handleAddRegion = () => {
    if (regionInput.trim()) {
      const formattedRegion = regionInput.charAt(0).toUpperCase() + regionInput.slice(1).toLowerCase();
      if (!selectedRegions.includes(formattedRegion)) {
        setSelectedRegions([...selectedRegions, formattedRegion]);
        setRegionInput("");
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup (false); 
    setSelectedRegions([]);
    setSelectedSpecies([]); 
  };

  const handleAddSpecies = () => {
  if (speciesInput.trim()) {
    const formattedSpecies = speciesInput.charAt(0).toUpperCase() + speciesInput.slice(1).toLowerCase();
    if (!selectedSpecies.includes(formattedSpecies)) {
      setSelectedSpecies([...selectedSpecies, formattedSpecies]);
      setSpeciesInput(""); 
    }
  }
};


  useEffect(() => {
    const random = getRandomChampion();
    setTargetChampion(random);
  }, []);

  const isCorrect = targetChampion &&
  guesses.length > 0 &&
  guesses[guesses.length - 1].champion.name === targetChampion.name;


  const handleGuessWithName = (name: string) => {
    const guessedChampion = champions.find(
      (champ) => champ.name.toLowerCase() === name.toLowerCase()
    );
  
    if (!guessedChampion || !targetChampion) return;
  
    const result = compareChampions(guessedChampion, targetChampion);
    setGuesses((prev) => [...prev, { champion: guessedChampion, result }]);
    setGuessName("");
  };
  

  const handleRestart = () => {
    setTargetChampion(getRandomChampion());
    setGuesses([]);
    setGuessName("");
  };

  return (
    <main className="min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl flex justify-center items-center font-bold mb-6">LoL Şampiyon Tahmin Oyunu</h1>
  
<div className="relative flex justify-center items-center gap-2 mb-6">
<input
  value={guessName}
  onChange={(e) => {
    const value = e.target.value;
    setGuessName(value);
  
    if (value.length > 0) {
      const guessedNames = guesses.map(g => g.champion.name.toLowerCase());
  
      const filtered = champions
        .map((champ) => champ.name)
        .filter((name) =>
          name.toLowerCase().startsWith(value.toLowerCase()) &&
          !guessedNames.includes(name.toLowerCase()) 
        )
        .slice(0, 20);
  
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }}
  
  
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const selectedName =
        filteredSuggestions[activeSuggestionIndex] || guessName;
      handleGuessWithName(selectedName);
      setShowSuggestions(false);
      setActiveSuggestionIndex(0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex + 1 < filteredSuggestions.length ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    }
  }}
  
  
  placeholder="Bir şampiyon ismi gir..."
  className={`p-2 rounded border w-64 text-center placeholder-gray-400 ${
    isCorrect ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-800 text-white border-gray-600"
  }`}
  disabled={isCorrect || false}
/>
{showSuggestions && filteredSuggestions.length > 0 && (
  <ul className="absolute top-full mt-1 w-64 bg-gray-800 text-white rounded shadow-lg z-10 border border-gray-600">
    {filteredSuggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => {
          setGuessName(suggestion);
          handleGuessWithName(suggestion);
          setShowSuggestions(false);
          setActiveSuggestionIndex(0);
        }}
        className={`px-4 py-2 cursor-pointer ${
          index === activeSuggestionIndex
            ? "bg-gray-600"
            : "hover:bg-gray-700"
        }`}
      >
        {suggestion}
      </li>
    ))}
  </ul>
)}


  <button
    onClick={() => handleGuessWithName(guessName)}
    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
  >
    Tahmin Et
  </button>
  <button
    onClick={handleRestart}
    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
  >
    Yeni Oyun
  </button>
  <button
  onClick={() => setShowPopup(true)}
    className="bg-yellow-600 px-4 py-2 rounded hover:bg-gray-700"
  >
    Şampiyon ekle
  </button>
</div>

  
      {/* Başlık Satırı */}
      {guesses.length > 0 && (
        <div className="overflow-auto">
          <div className="grid grid-cols-8 gap-2 font-bold text-center mb-2 text-sm">
            <div>Champion</div>
            <div>Gender</div>
            <div>Position(s)</div>
            <div>Species</div>
            <div>Resource</div>
            <div>Range</div>
            <div>Region(s)</div>
            <div>Release Year</div>
          </div>
  
          <div className="space-y-2">
            {guesses.map(({ champion, result }, i) => (
              <div key={i} className="grid grid-cols-8 gap-2 items-center">
                <div className="flex items-center gap-2">
                <img
  src={champion.img}
  alt={champion.name}
  className="w-10 h-10 rounded-full object-cover border"
  onError={(e) => {
    (e.target as HTMLImageElement).src = "/placeholder.png";
  }}
/>
                  <span className="text-sm">{champion.name}</span>
                </div>
  
                {result.map((r, idx) => (
                  <div
                    key={idx}
                    className={`text-center text-sm p-1 rounded ${
                      r.result === "green"
                        ? "bg-green-600"
                        : r.result === "yellow"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
                    }`}
                  >
                    {Array.isArray(r.value)
                      ? r.value.join(", ")
                      : r.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
  
      {targetChampion &&
        guesses.length > 0 &&
        guesses[guesses.length - 1].champion.name === targetChampion.name && (
          <div className="mt-6 p-4 bg-green-700 text-white rounded text-center text-lg">
            🎉 Tebrikler! Doğru şampiyonu buldun: <strong>{targetChampion.name}</strong>
          </div>
        )}
      {showpopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Yeni Şampiyon Ekle</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPopup(false);
              }}
            >
              <input
                type="text"
                placeholder="Şampiyon ismi"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                required
              />
              <div className="mb-4">
              <label className="mr-4">
        <input
          type="radio"
          name="gender"
          value="Male"
          className="mr-2"
          required
        />
        Erkek
      </label>
      <label >
        <input
          type="radio"
          name="gender"
          value="Female"
          className="mr-2"
          required
        />
        Kadın
      </label>
              </div>
      <div className="mb-4">
      <div className="flex flex-row">
        <label>
          <input
            type="checkbox"
            name="features"
            value="Agility"
            className="mr-1"
          />
          Top
        </label>
        <label className="ml-2">
          <input
            type="checkbox"
            name="features"
            value="Agility"
            className="mr-1"
          />
          Jungle
        </label>
        <label className="ml-2">
          <input
            type="checkbox"
            name="features"
            value="Agility"
            className="mr-1"
          />
          Mid
        </label>
        <label className="ml-2">
          <input
            type="checkbox"
            name="features"
            value="Strength"
            className="mr-1"
          />
          Adc
        </label>
        <label className="ml-2">
          <input
            type="checkbox"
            name="features"
            value="Intelligence"
            className="mr-1"
          />
          Support
        </label>
      </div>
    </div>
    <div className="mb-4">
  <label className="block text-white mb-2">Species:</label>
  <div className="flex items-center">
    <input
      type="text"
      value={speciesInput}
      onChange={(e) => setSpeciesInput(e.target.value)}
      placeholder="Species ekle"
      className="w-full p-2 bg-gray-700 text-white rounded"
    />
    <button
      type="button"
      onClick={handleAddSpecies}
      className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      +
    </button>
  </div>
</div>
<div className="mb-4">
  <label className="block text-white mb-2">Seçilen Species:</label>
  <div className="bg-gray-700 text-white p-2 rounded">
    {selectedSpecies.length > 0 ? (
      selectedSpecies.map((species, index) => (
        <span key={index} className="mr-2">
          {species},
        </span>
      ))
    ) : (
      <span>Hiçbir species seçilmedi.</span>
    )}
  </div>
</div>
              <input
                type="text"
                placeholder="Resource"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                required
              />
              <div className="mb-4">
      <div className="flex flex-row">
        <label>
          <input
            type="checkbox"
            name="features"
            value="Agility"
            className="mr-1"
          />
          Melee
        </label>
        <label className="ml-2">
          <input
            type="checkbox"
            name="features"
            value="Agility"
            className="mr-1"
          />
          Ranged
        </label>
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Region:</label>
          <div className="flex items-center">
            <input
              type="text"
              value={regionInput}
              onChange={(e) => setRegionInput(e.target.value)}
              placeholder="Region ekle"
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            <button
              type="button"
              onClick={handleAddRegion}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Seçilen Regionlar:</label>
          <div className="bg-gray-700 text-white p-2 rounded">
            {selectedRegions.length > 0 ? (
              selectedRegions.map((region, index) => (
                <span key={index} className="mr-2">
                  {region}
                </span>
              ))
            ) : (
              <span>Hiçbir region seçilmedi.</span>
            )}
          </div>
        </div>

              <input
                type="number"
                placeholder="Release Year"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded no-spinner"
                required
              />
              
              
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-50"
              >
                Ekle
              </button>
              <button
              onClick={handleClosePopup}
              className="bg-red-600 mt-4 text-white-500 rounded hover:underline w-32 px-4 py-2 ml-2"
            >
              Kapat
            </button>
            </form>
            </div>
          </div>
      )}
    </main>
  );
  
}
