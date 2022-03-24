import React, { Fragment } from "react";
import { Line } from "react-chartjs-2";
import {
  organiseGraphData,
  dateToDateName,
  addHoursToDate,
  dateGreaterThan
} from "../../../helper/functions";

const Graph = ({ width, height, data }) => {
  const today = new Date();

  const futureDatesArray = getFutureDates(20, 5);
  const futureDate = futureDatesArray.map(x => x.date);
  const futureDateNames = futureDatesArray.map(x => x.dateName);

  const levelsCount = getReviewsOnFutureDates(data, futureDate);

  const state = {
    data: {
      labels: futureDateNames,
      datasets: [
        {
          label: "Novice",
          backgroundColor: "rgba(119,159,255, 0.85)",
          data: levelsCount[0]
        },
        {
          label: "Proficient",
          backgroundColor: "rgba(83,198,131, 0.85)",
          data: levelsCount[1]
        },
        {
          label: "Advanced",
          backgroundColor: "rgba(255,92,168, 0.85)",
          data: levelsCount[2]
        },
        {
          label: "Superior",
          backgroundColor: "rgba(249,207,49, 0.85)",
          data: levelsCount[3]
        }
      ]
    }
  };

  console.log("DATA:", data);
  if (data) {
    let organisedData = organiseGraphData(data);
    console.log("Organised Data:", organisedData);
  }

  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }}
      data={state.data}
    />
  );
};

const getFutureDates = (points, dayIntervals) => {
  const futureDates = [];

  for (let i = 0; i < points; i++) {
    const today = new Date();
    const hours = dayIntervals * 24;
    const nextDate = addHoursToDate(today, hours * i);
    const nextDateName = dateToDateName(nextDate);

    futureDates.push({ date: nextDate, dateName: nextDateName });
  }
  return futureDates;
};

const getReviewsOnFutureDates = (data, futureDates) => {
  const len = futureDates.length;
  const levelsCount = [
    new Array(len).fill(0),
    new Array(len).fill(0),
    new Array(len).fill(0),
    new Array(len).fill(0),
    new Array(len).fill(0)
  ];

  data.forEach((flashcard, i) => {
    for (let j = 0; j < len; j++) {
      const date = futureDates[j];
      let { level, next_review } = flashcard;
      next_review = new Date(next_review);

      if (level == 0) break;
      if (dateGreaterThan(date, next_review)) {
        levelsCount[level - 1][j] += 1;
        break;
      }
    }
  });
  return levelsCount;
};

export default Graph;
