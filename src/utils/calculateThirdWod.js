import LeaderboardTeams from '../components/LeaderboardTeams/LeaderboardTeams';

export function calculateThirdWod(leaderboard) {
  // CREATE ARRAY WITH ATHLETES WHO FINISHED
  const athletesWhoFinished = leaderboard.filter(
    (athlete) => athlete.thirdWodReps === 170
  );

  // CREATE ARRAY WITH ATHLETES WHO DID NOT FINISH
  const athletesWhoDidNotFinish = leaderboard.filter(
    (athlete) => athlete.thirdWodReps < 170
  );

  // ADD RANKING TO ATHLETES WHO FINISHED ARRAY
  athletesWhoFinished.sort(
    (athleteA, athleteB) => athleteA.thirdWodTime - athleteB.thirWodTime
  );

  // ADD RANKING TO ATHLETES WHO DID NOT FINISH ARRAY
  athletesWhoDidNotFinish.sort(
    (athleteA, athleteB) => athleteB.thirdWodReps - athleteA.thirdWodReps
  );

  const mergedLeaderboard = athletesWhoFinished.concat(athletesWhoDidNotFinish);

  const rankedLeaderboard = mergedLeaderboard.map((athlete, index) => {
    athlete.rankingWodThree = index + 1;
    return athlete;
  });

  return rankedLeaderboard;
}
