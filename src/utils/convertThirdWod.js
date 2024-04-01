export const convertThirdWod = (user) => {
    // IF FIRST WOD TIME < 15' THEN RETURN TIME AND SET RESULT TO 180
    if (user.wodThreeTime < 900) {
        const minutes = Math.floor(user.wodThreeTime / 60);
        const remainingSeconds = user.wodThreeTime % 60;
        return minutes + ":" + remainingSeconds
    }
    // SET TIME TO 900 AND RETURN RESULTS
    return user.wodThreeResult
}