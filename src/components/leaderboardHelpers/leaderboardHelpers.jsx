import results from '../../database/results.json'
  
  // CREATE LEADERBOARD
  const createLeaderboard = (category) => {
    const leaderboard = results.filter(item => item.category === category); //create array based for RX or scaled
    const leaderboardAfterWodOne = addRankingFirstWod(leaderboard)
    const leaderboardAfterWodTwo = addRankingSecondWod(leaderboardAfterWodOne)
    const finalLeaderboard = addTotalRanking(leaderboardAfterWodTwo)
    return finalLeaderboard //return sorted array
  }

  // ADD RANKING FOR FIRST WOD
  const addRankingFirstWod = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((a,b) => a.firstWodTime - b.firstWodTime) //sort array based on FirstWodResult
    orderedLeaderboard.map((item) => item.rankingWodOne = orderedLeaderboard.indexOf(item)+1) //add first wod ranking to each object
    return orderedLeaderboard
  }

   // ADD RANKING FOR SECOND WOD
   const addRankingSecondWod = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((b,a) => a.secondWodReps - b.secondWodReps) //sort array based on FirstWodResult
    orderedLeaderboard.map((item) => item.rankingWodTwo = orderedLeaderboard.indexOf(item)+1) //add second wod ranking to each object
    return orderedLeaderboard
  }

  // ADD TOTAL RANKING
  const addTotalRanking = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((a,b) => (a.rankingWodOne+a.rankingWodTwo) - (b.rankingWodOne+b.rankingWodTwo)) //sort array based on ALL WODs
    orderedLeaderboard.map((item) => item.rankingTotal = orderedLeaderboard.indexOf(item)+1) //add total ranking to each object in array
    return orderedLeaderboard
  }

  export {createLeaderboard, addRankingFirstWod, addRankingSecondWod, addTotalRanking}