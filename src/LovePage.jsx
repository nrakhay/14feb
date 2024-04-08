import { useState } from "react";
import excitedCat from "./assets/cat-excited.gif";
import holdingHeadCat from "./assets/cat-holding-head.gif";
import meowCat from "./assets/cat-meow.gif";
import sadLyingCat from "./assets/cat-sad-lying.gif";
import tongueCat from "./assets/cat-tongue.gif";
import happyCat from "./assets/cat-happy.gif";
import cryingCat from "./assets/cat-crying.gif";
import headSadCat from "./assets/cat-head-sad.gif";
import comingSadCat from "./assets/cat-sad-coming.gif";

import Confetti from "react-confetti";

const LovePage = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({});
  const [name, setName] = useState("Name");
  const [currentGif, setCurrentGif] = useState(excitedCat);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [prevCatIndex, setPrevCatIndex] = useState(0);
  const [noHoverCount, setNoHoverCount] = useState(0);

  const sad_cats = [
    holdingHeadCat,
    meowCat,
    tongueCat,
    cryingCat,
    comingSadCat,
    sadLyingCat
    headSadCat
  ];

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const moveButton = () => {
    let idx = getRandomInt(sad_cats.length);
    while (idx === prevCatIndex) {
      idx = getRandomInt(sad_cats.length);
    }

    setPrevCatIndex(idx);
    setCurrentGif(sad_cats[idx]);
    setNoHoverCount(noHoverCount + 1);

    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );

    const top = Math.random() * (vh - 50);
    const left = Math.random() * (vw - 50);

    setNoButtonPosition({
      top: `${top}px`,
      left: `${left}px`,
      position: "fixed",
    });
  };

  const onClickYes = () => {
    setCurrentGif(happyCat);
    setIsYesClicked(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isYesClicked && (
        <Confetti
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight}
          gravity={1}
          recycle={false}
          numberOfPieces={1000}
          colors={[
            "#FC8EAC",
            "#FC6C85",
            "#FFD1DC",
            "#FFB7C5",
            "#E75480",
            "#FF6EC7",
          ]}
        />
      )}

      <div className="mb-5">
        <img src={currentGif} alt="gif" className="w-48 h-auto" />
      </div>

      <p
        hidden={isYesClicked}
        className="text-xl font-bold text-white text-center mb-5"
      >
        Let&apos;s make this Valentine&apos;s Day one to remember, <br />
        <span className="text-[#ff257e]">{name}, will you be mine?</span>
      </p>
      <p
        hidden={!isYesClicked}
        className="text-xl font-bold text-[#ff257e] text-center mb-5"
      >
        Yaaaaaayyy!!!!!
      </p>

      <div className="flex justify-center">
        <button
          hidden={isYesClicked}
          onClick={onClickYes}
          className="bg-[#FF69B4] hover:bg-[#ff257e] text-white font-bold py-2 px-6 rounded mr-2"
        >
          Yes
        </button>

        <button
          hidden={isYesClicked || noHoverCount > 4}
          onMouseEnter={moveButton}
          style={noButtonPosition}
          className="bg-[#b4b4b4] text-white font-bold py-2 px-6 rounded transition-transform duration-300 ease-in-out"
        >
          No
        </button>
      </div>

      <p
        hidden={noHoverCount <= 4 || isYesClicked}
        className="text-xs font-bold text-white text-center mb-5"
      >
        Haha, no more options!!!
      </p>
    </div>
  );
};

export default LovePage;
