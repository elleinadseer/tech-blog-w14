const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

// timing helpers

const format_date = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const timeago = (timestamp) => {
  dayjs.extend(relativeTime);
  return dayjs().fromNow(timestamp);
};

module.exports = { format_date, timeago };