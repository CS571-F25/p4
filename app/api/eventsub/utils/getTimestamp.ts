export function getWeekStart() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const dateOfMonth = today.getDate();

    // Calculate the date for the start of the week (Sunday)
    const startOfWeekDate = new Date(today.getFullYear(), today.getMonth(), dateOfMonth - dayOfWeek);

    // Set the time to 00:00:00.000 for the start of the day
    startOfWeekDate.setHours(0, 0, 0, 0);

    return startOfWeekDate.getTime();
}

export function getMonthStart() {
    const today = new Date();
    const startOfMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);

    // Set the time to 00:00:00.000 for the start of the day
    startOfMonthDate.setHours(0, 0, 0, 0);

    return startOfMonthDate.getTime();
}
