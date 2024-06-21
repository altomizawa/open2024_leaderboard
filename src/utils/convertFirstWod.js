export const convertFirstWod = (user) => {
    // IF FIRST WOD TIME < 15' THEN RETURN TIME AND SET RESULT TO 180
    if (user.wodOneTime < 900) {
        const minutes = Math.floor(user.wodOneTime / 60);
        const remainingSeconds = user.wodOneTime % 60;
        return minutes + ":" + remainingSeconds
    }
    // SET TIME TO 900 AND RETURN RESULTS
    return user.wodOneResult
}

export const convertToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes + ":" + remainingSeconds
}