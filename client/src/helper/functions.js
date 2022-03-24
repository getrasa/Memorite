import {
  INTERVAL_TO_LEVEL,
  INTERVAL_TO_HOURS,
  LEVEL_TO_NAME,
  LEVEL_TO_COLOR,
  SHORT_MONTH_NAMES
} from "./constants";

export const mapIntervalToLevel = interval => {
  return INTERVAL_TO_LEVEL[interval];
};

export const mapIntervalToHours = interval => {
  return INTERVAL_TO_HOURS[interval];
};

export const mapIntervalToLevelName = interval => {
  return LEVEL_TO_NAME[mapIntervalToLevel(interval)];
};

export const mapLevelToName = level => {
  return LEVEL_TO_NAME[level];
};

export const mapLevelToColor = level => {
  return LEVEL_TO_COLOR[level];
};

export const hoursToMillis = hours => {
  return hours * 3600000;
};

export const addHoursToDate = (date, hours) => {
  date.setTime(date.getTime() + hoursToMillis(hours));
  return date;
};

export const capitalise = x => {
  if (typeof x == "string") {
    return x.charAt(0).toUpperCase() + x.slice(1);
  }
};

export const organiseGraphData = data => {
  const sortedByProperty = {
    levels: [],
    next_reviews: []
  };

  const graphRange = {
    start: new Date(),
    end: null
  };

  data.reduce((obj, v) => {
    obj.levels.push(v.level);
    obj.next_reviews.push(v.next_review);

    return obj;
  }, sortedByProperty);

  graphRange.end = new Date(
    Math.max(...sortedByProperty.next_reviews.map(date => Date.parse(date)))
  );
  console.log("Sorted By Property:", sortedByProperty);
  console.log("Graph Range:", graphRange);

  return sortedByProperty;
};

export const indexToMonthName = index => {
  return SHORT_MONTH_NAMES[index];
};

export const dateToDateName = date => {
  const day = date.getDate();
  const month = indexToMonthName(date.getMonth());
  return day + " " + month;
};

export const dateGreaterThan = (dateOne, dateTwo) => {
  const dateOneMillis = dateOne.getTime();
  const dateTwoMillis = dateTwo.getTime();

  return dateOneMillis >= dateTwoMillis;
};

export const dateLessThan = (dateOne, dateTwo) => {
  const dateOneMillis = dateOne.getTime();
  const dateTwoMillis = dateTwo.getTime();

  return dateOneMillis < dateTwoMillis;
};

export const dateDifferenceSec = (dateOne, dateTwo) => {
  const dateOneMillis = dateOne.getTime();
  const dateTwoMillis = dateTwo.getTime();

  return Math.floor(Math.abs(dateOneMillis - dateTwoMillis) / 1000);
};
