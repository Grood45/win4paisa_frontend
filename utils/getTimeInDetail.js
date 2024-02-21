export function getTimeAgo(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - targetDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximating a month as 30 days
    const years = Math.floor(days / 365); // Approximating a year as 365 days
  
    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
    if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    if (weeks > 0) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    if (seconds > 0) {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }
  
    return "Just now";
  }
  

  
  // Example usage:
//   const timestamp = "2023-09-13 07:48 PM";
//   const timeAgo = getTimeAgo(timestamp);
  


// <ReactQuill
// value={newMessage}
// onChange={setNewMessage}
// formats={[
//   "header",
//   "font",
//   "size",
//   "list",
//   "bold",
//   "italic",
//   "underline",
//   "align",
//   "link",
//   "image",
// ]}
// style={{ marginBottom: 16, width: "100%" }}
// />