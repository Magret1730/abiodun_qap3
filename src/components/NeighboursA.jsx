import "../App.css";

function NeighborsA({ countries, countryCodeToNameMap }) {
  return (
    <div className="results">
      <h2>Countries with neighbors starting with "A"</h2>
      {countries.length === 0 ? (
        <p>No countries found.</p>
      ) : (
        <div className="country-flex">
            {countries.map((country) => (
                <div key={country.cca3} className="country-list">
                    <div>
                        <img src={country.flags.svg} alt={country.flags.alt} />
                    </div>

                    <div>
                        <p><strong>Official Country Name:</strong>  </p>
                        <p>{country.name.official}</p>
                    </div>

                    <div>
                        <p><strong>Capital Name:</strong> </p>
                        <p>{country.capital}</p>
                    </div>

                    <div>
                        <p><strong>Neighbours: </strong> </p>
                        <p>
                            <span>
                                {country.borders.map((code) => {
                                    return (
                                        <span key={code}>{countryCodeToNameMap[code]}{", "}</span>
                                    );
                                })}
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default NeighborsA;
