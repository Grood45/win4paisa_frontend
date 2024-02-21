function getTeamShortName(fullName) {
  // Split the full name into individual words
  const words = fullName?.split(" ");

  // Extract the initials from the words
  const initials = words?.reduce((acc, word) => {
    if (word) {
      acc += word[0].toUpperCase(); // Consider the first letter of each word
    }
    return acc.replace(/-/g, "");
  }, "");

  return initials;
}



export default getTeamShortName;

export function getDisplayDate(dateStr) {
  const itemDate = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isToday(itemDate)) {
    return "Today";
  } else if (isTomorrow(itemDate)) {
    return "Tomorrow";
  } else {
    // If it's neither today nor tomorrow, you can use the original date
    // You may want to format the date here if needed
    return dateStr;
  }
}

export function getDisplayDateSoccer(dateStr) {
  const parts = dateStr.split("/");
  const itemDate = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isToday(itemDate)) {
    return "Today";
  } else if (isTomorrow(itemDate)) {
    return "Tomorrow";
  } else {
    // If it's neither today nor tomorrow, you can use the original date
    // You may want to format the date here if needed
    return dateStr;
  }
}


// Helper function to check if a date is today
export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}


