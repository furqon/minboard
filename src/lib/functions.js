import _ from 'lodash'
import {get} from 'svelte/store'
import { storeHourly } from '../stores';

export function getWeekPeriod(dr) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const a = new Date(dr?.a)
  const b = new Date(dr?.b)
  
  return  `${a.toLocaleDateString('en', options)} - ${b.toLocaleDateString('en', options)}` 
}
// get date range for given date
export function getStartEndDate(dt) {
  var curr = new Date(dt);

  var first = curr.getDate() - curr.getDay();
  var last = first + 6;

  var firstday = new Date(curr.setDate(first)).toLocaleDateString();
  var lastday = new Date(curr.setDate(last)).toLocaleDateString();

  const dateRange = { a: formatDate(firstday), b: formatDate(lastday) };
  return dateRange;
}

// date formatting to string
function formatDate(curr) {
  return (
    new Date(curr).getFullYear() +
    '-' +
    ('0' + (new Date(curr).getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + new Date(curr).getDate()).slice(-2)
  );
}

// get daily data
export function getDaily(dateselect = 20170101) {
  let data = get(storeHourly)[0]
  return _.orderBy(_.filter(data, { datein: dateselect }), ['hour'], ['asc']);
}

// thousand separator
export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function get24H() {
  let d = [];
	const lZero = (num, places) => String(num).padStart(places, '0');
	for (let i = 0; i < 24; i++) {
		d.push(lZero(i, 2));
	}

  return d;
}

// date
export function getDateRange(data) {
  let daily = _(data)
			.groupBy('datein')
			.map((datein, id) => ({
				datein: id,
        label: _.chain(datein).map('datelabel').uniq().value()[0],
        hourly: _.groupBy(datein, 'datelabel'),
				revenue: _.sumBy(datein, 'revenue'),
				clicks: _.sumBy(datein, 'clicks'),
				impressions: _.sumBy(datein, 'impressions')
			}))
			.value();
  return _.map(daily, 'label')
}
