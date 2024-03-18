import { calculateThirdWod } from '../../utils/calculateThirdWod';

const createFinalLeaderboard = (rawLeaderboard) => {
  // SORT BY FIRST WOD
  const orderedByFirst = rawLeaderboard.sort(
    (a, b) => a.firstWodTime - b.firstWodTime
  );

  // ADD FIRST WOD RANKING
  orderedByFirst.map(
    (item) => (item.rankingWodOne = orderedByFirst.indexOf(item) + 1)
  );

  //SORT BY SECOND WOD
  const orderedBySecond = orderedByFirst.sort(
    (b, a) => a.secondWodReps - b.secondWodReps
  );

  // ADD SECOND WOD RANKING
  orderedBySecond.map(
    (item) => (item.rankingWodTwo = orderedBySecond.indexOf(item) + 1)
  );

  // SORT BY THIRD WOD AND ADD RANKING
  const orderedByThird = calculateThirdWod(orderedBySecond);

  // CREATE TOTAL POINTS BY ADDING RANKING FROM WOD 1, 2 & 3
  const addTotalPoints = orderedByThird.map(
    (item) =>
      (item.total =
        item.rankingWodOne + item.rankingWodTwo + item.rankingWodThree)
  );

  // CREATE SORT BY TOTAL POINTS
  const orderedByTotalPoints = orderedByThird.sort((a, b) => a.total - b.total);

  // CREATE FINAL RANKING BASED ON TOTAL POINTS
  return orderedByTotalPoints;
};

export { createFinalLeaderboard };
