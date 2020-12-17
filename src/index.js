import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const API_KEY = "19532547-7308d7b4ead734b0eeb8216a3";

const App = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getPictures = async (query) => {
      console.log("Calling getPictures");
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`
      );
      const data = await response.json();
      return data;
    };

    if (query.length >= 3) {
      console.log("Running query");
      getPictures(query)
        .then((data) => {
          setErrorMessage("");
          if (data) {
            console.log("Results", data["hits"]);
            setPhotos(data["hits"]);
          }
        })
        .catch((err) => {
          setErrorMessage("Error accessing the API");
        });
    }
  }, [query]);

  const handleOnChange = (event) => {
    console.log("Search", event.target.value);
    if (event.target.value) {
      setQuery(event.target.value);
    }
    event.persist();
  };

  return (
    <div>
      <div>
        <input className="input" name="query" onChange={handleOnChange} />
      </div>
      <div>
        {errorMessage}
        <div className="container">
          {photos.map((photo) => {
            return (
              <div key={Math.random()}>
                <img width="200px" alt="results" src={photo["webformatURL"]} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
