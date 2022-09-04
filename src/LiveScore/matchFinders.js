const findClosestPreviousMatch = ({
  setLastHomeTeam,
  setLastAwayTeam,
  setLastMatchData,
}) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_Rapid_API,
      'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
    }
  };

  fetch('https://sportscore1.p.rapidapi.com/teams/145/events?page=1', options)
    .then(response => {
      response.json()
        .then(res => {
          console.log(res.data[0]);
          const fixtures = res.data;
          const [fixture] = closestPreviousFixture(fixtures);

          const updatedHomeTeam = {
            id: fixture.home_team_id,
            name: fixture.home_team?.name,
            logo: fixture.home_team?.logo,
            currentScore: fixture.home_score?.current,
          }
          const updatedAwayTeam = {
            id: fixture.away_team_id,
            name: fixture.away_team?.name,
            logo: fixture.away_team?.logo,
            currentScore: fixture.away_score?.current,
          }

          const updatedMatchData = {
            status: fixture.status,
            league: fixture.league?.name,
            logo: fixture.league?.logo,
            result: fixture.home_score?.current + "-" + fixture.away_score?.current || null,
          }

          setLastHomeTeam(team => ({
            ...team,
            ...updatedHomeTeam,
          }));
          setLastAwayTeam(team => ({
            ...team,
            ...updatedAwayTeam,
          }));
          setLastMatchData(lastMatchData => ({
            ...lastMatchData,
            ...updatedMatchData,
          }));

          console.log(updatedHomeTeam);
          console.log(updatedMatchData);
        })
    })
    .catch(err => console.error(err));
}

const findClosestNextMatch = ({
  setNextHomeTeam,
  setNextAwayTeam,
  setNextMatchData
}) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_Rapid_API,
      'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
    }
  };

  fetch('https://sportscore1.p.rapidapi.com/teams/145/events?page=1', options)
    .then(response => {
      response.json()
        .then(res => {
          console.log(res.data[0]);
          const fixtures = res.data;
          const [fixture] = closestNextFixture(fixtures);

          const updatedHomeTeam = {
            id: fixture.home_team_id,
            name: fixture.home_team?.name,
            logo: fixture.home_team?.logo,
            currentScore: fixture.home_score?.current,
          }
          const updatedAwayTeam = {
            id: fixture.away_team_id,
            name: fixture.away_team?.name,
            logo: fixture.away_team?.logo,
            currentScore: fixture.away_score?.current,
          }

          const updatedMatchData = {
            status: fixture.status,
            league: fixture.league?.name,
            logo: fixture.league?.logo,
            result: fixture.home_score?.current + "-" + fixture.away_score?.current || null,
          }

          setNextHomeTeam(team => ({
            ...team,
            ...updatedHomeTeam,
          }));
          setNextAwayTeam(team => ({
            ...team,
            ...updatedAwayTeam,
          }));
          setNextMatchData(nextMatchData => ({
            ...nextMatchData,
            ...updatedMatchData,
          }));

          console.log(updatedHomeTeam);
          console.log(updatedMatchData);
        })
    })
    .catch(err => console.error(err));
}

const closestNextFixture = fixtures => {
  const now = new Date();
  let closestDate = Infinity;
  let closestFixture;
  fixtures.forEach(fixture => {
    const fixtureDate = new Date(fixture.start_at)
    if (fixtureDate >= now && fixtureDate < closestDate) {
      closestDate = fixtureDate;
      closestFixture = fixture;
    }
  });
  console.log("closestDate: ", closestDate);
  console.log("closestFixture: ", closestFixture);
  return [closestFixture];

}

const closestPreviousFixture = fixtures => {
  const now = new Date();
  let closestDate = -Infinity;
  let closestFixture;
  fixtures.forEach(fixture => {
    const fixtureDate = new Date(fixture.start_at)
    if (fixtureDate < now && fixtureDate >= closestDate) {
      closestDate = fixtureDate;
      closestFixture = fixture;
    }
  });
  console.log("closestDate: ", closestDate);
  console.log("closestFixture: ", closestFixture);
  return [closestFixture];
}

export { findClosestPreviousMatch, findClosestNextMatch };