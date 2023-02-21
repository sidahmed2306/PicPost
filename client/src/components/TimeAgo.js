import React from "react";

function TimeAgo({ timestamp }) {
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const elapsed = Date.now() - new Date(timestamp).getTime();

  if (elapsed < msPerMinute) {
    return <p>{Math.round(elapsed / msPerSecond)} seconds </p>;
  } else if (elapsed < msPerHour) {
    return <p>{Math.round(elapsed / msPerMinute)} minutes </p>;
  } else if (elapsed < msPerDay) {
    return <p>{Math.round(elapsed / msPerHour)} hours </p>;
  } else if (elapsed < msPerWeek) {
    return <p>{Math.round(elapsed / msPerDay)} days </p>;
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day}.${month}.${year}`;
    return <p>{formattedDate}</p>;
  }
}

export default TimeAgo;
