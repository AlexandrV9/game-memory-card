import React, { useEffect, useState } from "react";
import "./App.css";

import pathIconCar from './icon/icon-cake.png';
import pathIconCake from './icon/icon-car.png';
import pathIconTeapot from './icon/icon-cat.png';
import pathIconDog from './icon/icon-dog.png';
import pathIconCat from './icon/icon-teapot.png';
import pathIconLamp from './icon/icon-lamp.png';

import pathIconQuestion from './icon/icon-question.png';

export default function App() {

  const [arrayCards, setArrayCards] = useState([]);
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initialArrayCards = [
    { id: 1, img: pathIconCar },
    { id: 2, img: pathIconCake },
    { id: 3, img: pathIconTeapot },
    { id: 4, img: pathIconDog },
    { id: 5, img: pathIconCat },
    { id: 6, img: pathIconLamp }
  ];

  const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards];

  const shuffle = (array) => {
    let currentIndex = array.length, 
      temporaryValue, 
      randomIndex;
    while (0 !== currentIndex) {
    
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
    
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
    
  useEffect(() => {
    setArrayCards(shuffle(pairOfArrayCards));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flipCard = (index) => {
    setOpenedCard((opened) => [...opened, index]);
    setMoves((preventValue) => preventValue+1);
  }

  const clickButoonStartOver = () => {
    setOpenedCard([]);
    setMatched([]);
    setMoves(0);
    setArrayCards(shuffle(pairOfArrayCards));
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = arrayCards[openedCard[0]];
    const secondMatched = arrayCards[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedCard]);

  return (
    <div className="App">
      <p className="number-of-strokes">{`?????????????? ??????????: ${moves}`} </p>
      <div className="cards">
        {arrayCards.map((item, index) => {

          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(item.id)) isFlipped = true;
          
          return (
            <>
            <div
              className={`card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src={item.img}
                    alt="name"
                    width="100"
                  />
                </div>
                <div className="back">
                  <img className="back-image" src={pathIconQuestion} alt = "???????????? ??????????????"/>
                </div>
              </div>
            </div>
            </>
          );
        })}
      </div>
      <button className="button-start-over" onClick={clickButoonStartOver}>???????????? ????????????</button>
    </div>
  );
}