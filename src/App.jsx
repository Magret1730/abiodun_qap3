import { useEffect, useState } from 'react';
import './App.css';
import NeighboursA from './components/NeighboursA';
import NeighboursI from './components/Neighboursi';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryCodeToNameMap, setCountryCodeToNameMap] = useState({});
  const [show, setShow] = useState(null); 

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3`);

      const data = await response.json();

      // Links up country code to country name
      const countryMap = {};
      data.forEach((country) => {
        countryMap[country.cca3] = country.name.common;
      });

      setCountryCodeToNameMap(countryMap);
      setCountries(data);
    }

    fetchCountries();
  }, []);

  // Filters out neighbouring countries based on letter
  const neighborCountryStartingWith = (letter) => {
    const filtered = countries.filter((country) => {
      if (!country.borders || country.borders.length === 0) return false;
  
      return country.borders.some((borderCode) => {
        const neighborName = countryCodeToNameMap[borderCode];
        return neighborName && neighborName.startsWith(letter);
      });
    });
  
    setFilteredCountries(filtered);
    setShow(letter);
  }

  return (
    <section>
      <h1>Neighbouring Countries</h1>

      <div className="country-button">
        <button onClick={() => neighborCountryStartingWith("A")}>NEIGHBOURS STARTING WITH A</button>
        <button onClick={() => neighborCountryStartingWith("I")}>NEIGHBOURS STARTING WITH I</button>
      </div>

      {show === "A" && (
        <NeighboursA countries={filteredCountries} countryCodeToNameMap={countryCodeToNameMap} />
      )}
      {show === "I" && (
        <NeighboursI countries={filteredCountries} countryCodeToNameMap={countryCodeToNameMap} />
      )}
    </section>
  )
}

export default App;
