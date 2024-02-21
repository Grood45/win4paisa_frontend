function CategorizeDate(dateString) {
    if (!dateString) return null;

    const regex = /^(\w{3}) (\d{1,2}) (\d{4}) (\d{1,2}):(\d{2})([APM]+)\s*\((\w+)\)$/;
    const match = dateString.match(regex);

    if (!match) return null;

    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const [, monthStr, day, year, hours, minutes, period, timeZone] = match;
    const month = months[monthStr];

    if (month === undefined || day === undefined || year === undefined || hours === undefined || minutes === undefined) {
        return null;
    }

    let hoursNum = parseInt(hours, 10);
    if (period === 'PM' && hoursNum !== 12) {
        hoursNum += 12;
    } else if (period === 'AM' && hoursNum === 12) {
        hoursNum = 0;
    }

    const convertedDate = new Date(Date.UTC(year, month, day, hoursNum, parseInt(minutes, 10)));

    // Get today's date without the time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get tomorrow's date without the time
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Check the date and categorize it
    if (convertedDate >= today && convertedDate < tomorrow) {
        return 'Today';
    } else if (convertedDate >= tomorrow) {
        return 'Tomorrow';
    } else {
        return 'Upcoming';
    }
}

  
  export default CategorizeDate