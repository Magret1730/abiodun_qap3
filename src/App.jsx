import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryCodeToNameMap, setCountryCodeToNameMap] = useState({});

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

  // Countries starting with A
  // const countryStartingWithA = () => {
  //   const filtered = countries.filter((country) =>
  //     country.name.common.startsWith("A")
  //   );
  //   setFilteredCountries(filtered);
  // };

  // Countries starting with I
  // const countryStartingWithI = () => {
  //   const filtered = countries.filter((country) =>
  //     country.name.common.startsWith("I")
  //   );
  //   setFilteredCountries(filtered);
  // };

  const neighborCountryStartingWith = (letter) => {
    const filtered = countries.filter((country) => {
      if (!country.borders || country.borders.length === 0) return false;
  
      return country.borders.some((borderCode) => {
        const neighborName = countryCodeToNameMap[borderCode];
        return neighborName && neighborName.startsWith(letter);
      });
    });
  
    setFilteredCountries(filtered);
  }

  return (
    <section>
      <h1>Neighbouring Countries</h1>

      <div className="country-button">
        <button onClick={() => neighborCountryStartingWith("A")}>NEIGHBOURS STARTING WITH A</button>
        <button onClick={() => neighborCountryStartingWith("I")}>NEIGHBOURS STARTING WITH I</button>
      </div>

      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="country-list">
            <div>
              <img src={country.flags.svg} alt={country.flags.alt} />
            </div>
            <div>
              <li><strong>Official Country Name:</strong> {country.name.official} </li>
              <li><strong>Capital Name:</strong> {country.capital}</li>
              <li>
                <strong>Neighboring Countries: </strong>
                {country.borders && country.borders.length > 0 ? (
                  <span>
                    {country.borders.map((borderCode) => (
                      <span key={borderCode}>
                        {countryCodeToNameMap[borderCode] || borderCode}{", "}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span> None</span>
                )}
              </li>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App;
