export const INTERVAL_1 = 4;
export const INTERVAL_2 = 8;
export const INTERVAL_3 = 23;
export const INTERVAL_4 = 47;
export const INTERVAL_5 = 167;
export const INTERVAL_6 = 335;
export const INTERVAL_7 = 719;
export const INTERVAL_8 = 2879;

export const LEVEL_0 = { name: "study", intervals: [0], level: 0 };
export const LEVEL_1 = { name: "novice", intervals: [1, 2, 3], level: 1 };
export const LEVEL_2 = { name: "proficient", intervals: [4, 5], level: 2 };
export const LEVEL_3 = { name: "advanced", intervals: [6], level: 3 };
export const LEVEL_4 = { name: "superior", intervals: [7], level: 4 };
export const LEVEL_5 = { name: "burned", intervals: [8], level: 5 };

export const INTERVAL_TO_LEVEL = {
  "0": 1,
  "1": 1,
  "2": 1,
  "3": 1,
  "4": 2,
  "5": 2,
  "6": 3,
  "7": 4,
  "8": 5
};

export const LEVEL_TO_NAME = {
  "0": "study",
  "1": "novice",
  "2": "proficient",
  "3": "advanced",
  "4": "superior",
  "5": "burned"
};

export const LEVEL_TO_COLOR = {
  "0": "#DCDEE5",
  "1": "#779FFF",
  "2": "#53C683",
  "3": "#FF5CA8",
  "4": "#F9CF31",
  "5": "#9DA6BA"
};

export const INTERVAL_TO_HOURS = {
  "1": INTERVAL_1,
  "2": INTERVAL_2,
  "3": INTERVAL_3,
  "4": INTERVAL_4,
  "5": INTERVAL_5,
  "6": INTERVAL_6,
  "7": INTERVAL_7,
  "8": INTERVAL_8,
  "9": null
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
