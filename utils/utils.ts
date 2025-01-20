export const getDaysDifference = (date1: Date, date2: Date) => {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return; // Handle errors
  }

  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // Convert to days
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`;
};

export const getElapsedTime = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date"; // Handle errors

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  // If more than a week, return formatted date
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
