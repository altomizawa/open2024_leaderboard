const calculateFirstWod = (leaderboard) => {
    // CREATE ARRAY WITH ATHLETES WHO FINISHED
    const athletesWhoFinished = leaderboard.filter(
        (athlete) => athlete.firstWodReps === 180
    );

    // CREATE ARRAY WITH ATHLETES WHO DID NOT FINISH
    const athletesWhoDidNotFinish = leaderboard.filter(
        (athlete) => athlete.firstWodReps < 180
    );

    // ADD RANKING TO ATHLETES WHO FINISHED ARRAY
    athletesWhoFinished.sort(
        (athleteA, athleteB) => athleteA.firstWodTime - athleteB.firstWodTime
    );

    // ADD RANKING TO ATHLETES WHO DID NOT FINISH ARRAY
    athletesWhoDidNotFinish.sort(
        (athleteA, athleteB) => athleteB.firstWodReps - athleteA.firstWodReps
    );

    const mergedLeaderboard = athletesWhoFinished.concat(athletesWhoDidNotFinish);

    const rankedLeaderboard = mergedLeaderboard.map((athlete, index) => {
        athlete.rankingWodThree = index + 1;
        return athlete;
    });

    return rankedLeaderboard;

}

export {calculateFirstWod}