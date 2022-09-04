import { useEffect, useState } from "react";
import Fixture from "./Fixture/Fixture";
import { findClosestPreviousMatch, findClosestNextMatch } from "./matchFinders";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import './LiveScore.css';

const LiveScore = () => {
  const [nextMatchData, setNextMatchData] = useState({});
  const [nextHomeTeam, setNextHomeTeam] = useState({});
  const [nextAwayTeam, setNextAwayTeam] = useState({});

  const [lastMatchData, setLastMatchData] = useState({});
  const [lastHomeTeam, setLastHomeTeam] = useState({});
  const [lastAwayTeam, setLastAwayTeam] = useState({});

  const [shownFixture, setShownFixture] = useState('next');

  const showLastMatch = () => {
    setShownFixture('last')
    findClosestPreviousMatch({
      setLastHomeTeam,
      setLastAwayTeam,
      setLastMatchData,
    })
  }

  const showNextMatch = () => {
    setShownFixture('next')
    findClosestNextMatch({
      setNextHomeTeam,
      setNextAwayTeam,
      setNextMatchData
    })
  }

  useEffect(() => {
    console.log(nextMatchData);
  }, [nextMatchData]);

  useEffect(() => {
    showLastMatch();
  }, []);

  return (
    <section className="live-score">
      <div className="round-controls">
        <MdNavigateBefore
          className={"round " + (shownFixture === "last" ? "hide-match" : "")}
          onClick={showLastMatch}
        />
        <MdNavigateNext
          className={"round " + (shownFixture === "next" ? "hide-match" : "")}
          onClick={showNextMatch}
        />
      </div>
      <div className="live-container">
        {
          shownFixture === "next" ?
            <Fixture
              matchData={nextMatchData}
              homeTeam={nextHomeTeam}
              awayTeam={nextAwayTeam}
            />
            :
            <Fixture
              matchData={lastMatchData}
              homeTeam={lastHomeTeam}
              awayTeam={lastAwayTeam}
            />
        }
      </div>
    </section>
  );
}

export default LiveScore;