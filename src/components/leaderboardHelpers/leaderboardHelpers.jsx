import results from '../../database/results.json'

import { calculateFirstWod } from '../../utils/calculateFirstWod';
import { calculateThirdWod } from '../../utils/calculateThirdWod';
  
  // CREATE LEADERBOARD
  const createLeaderboard = (category) => {
    const leaderboard = results.filter(item => item.category === category); //create array based for RX or scaled
    const leaderboardAfterWodOne = addRankingFirstWod(leaderboard)
    const leaderboardAfterWodTwo = addRankingSecondWod(leaderboardAfterWodOne)
    const leaderboardAfterWodThree = addRankingThirdWod(leaderboardAfterWodTwo)
    const finalLeaderboard = addTotalRanking(leaderboardAfterWodThree)
    return finalLeaderboard //return sorted array
  }

  const addRankingFirstWod = (leaderboard) => {
    return calculateFirstWod(leaderboard)
  }

   // ADD RANKING FOR SECOND WOD
   const addRankingSecondWod = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((b,a) => a.secondWodReps - b.secondWodReps) //sort array based on FirstWodResult
    orderedLeaderboard.map((item) => item.rankingWodTwo = orderedLeaderboard.indexOf(item)+1) //add second wod ranking to each object
    return orderedLeaderboard
  }

  // ADD RANKING FOR THIRD WOD
  const addRankingThirdWod = (leaderboard) => {
    return calculateThirdWod(leaderboard)
  }


  // ADD TOTAL RANKING
  const addTotalRanking = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((a,b) => (a.rankingWodOne + a.rankingWodTwo + a.rankingWodThree) - (b.rankingWodOne + b.rankingWodTwo + b.rankingWodThree)) //sort array based on ALL WODs
    orderedLeaderboard.map((item) => item.rankingTotal = orderedLeaderboard.indexOf(item)+1) //add total ranking to each object in array
    return orderedLeaderboard
  }

  // ADD TOTAL RANKING FOR TEAMS
  const addTotalRankingForTeams = (leaderboard) => {
    const orderedTeamLeaderboard = leaderboard.sort((a, b) => (a.totalScore - b.totalScore)) //sort array based on totalScore
    orderedTeamLeaderboard.map((team) => team.ranking = orderedTeamLeaderboard.indexOf(team)+1) //add ranking to each object in array
    return orderedTeamLeaderboard
  }

  export {createLeaderboard, addTotalRankingForTeams}