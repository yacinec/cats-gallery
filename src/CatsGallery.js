import React, { useState } from "react";
import "./CatsGallery.css";

const catsMock = [
  {
    id: "1",
    name: "Robi",
    birthdate: "2015-03-29",
    breed: "Persian",
    location: "Paris refuge - 75",
    gender: "Male",
    picturePath: "http://placekitten.com/200/300",
  },
  {
    id: "2",
    name: "Toto",
    birthdate: "2014-09-25",
    breed: "Russian blue",
    location: "Marseille refuge - 13",
    gender: "Male",
    picturePath: "http://placekitten.com/400/300",
  },
  {
    id: "3",
    name: "Gus",
    birthdate: "2012-05-19",
    breed: "Persian",
    location: "Grenoble refuge - 38",
    gender: "Male",
    picturePath: "http://placekitten.com/500/300",
  },
  {
    id: "4",
    name: "Lulu",
    birthdate: "2013-06-20",
    breed: "Norwegian",
    location: "Bordeaux refuge - 33",
    gender: "Female",
    picturePath: "http://placekitten.com/200/250",
  },
];

const CatsGallery = () => {
  // /!\ Warning !
  // Here is a data example with harcoded cats. You must fetch
  // data from the endpoint provided in the README.md instead.
  // Tip: you can use the fetch api (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  const [cats] = useState(catsMock);

  return (
    <div className="gallery">
      <h1 className="title">Cats gallery</h1>
      <ul className="list">
        {cats.map((cat) => (
          <li key={cat.id} className="listItem">
            <img src={cat.picturePath} alt={cat.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatsGallery;
