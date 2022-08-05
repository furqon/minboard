import { writable, derived } from 'svelte/store';
import _ from 'lodash';

// POI
export const storePoi = writable([])

export const poiSelect = writable(0)


// weekly date range
export const storeDateRange = writable([])

// data in hourly format
export const storeHourly = writable([])

export const chartSeries = derived(
	storeHourly,
  ($storeHourly) => {
    let daily = _($storeHourly[0])
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

    // series
    const label = _.map(daily, 'datein');
    const bydate = _.map(daily, 'hourly');
    let dailyhourly = [];
    
    _.forEach(_.map(daily, 'hourly'), function(k) {
      dailyhourly.push(k[Object.keys(k)])
    });

    const revenue = _.map(_.map(daily, 'revenue'), function toin(n) { return parseInt(n) });
    const impressions = _.map(daily, 'impressions');
    const clicks = _.map(daily, 'clicks');

    // total
    const totalRevenue = _.sum(revenue)
    const totalClicks = _.sum(clicks)
    const totalImpressions = _.sum(impressions)

    // average
    const avgRevenue = _.mean(revenue)
    const avgClicks = _.mean(clicks)
    const avgImpressions = _.mean(impressions)

    return {
      daily,
      label, 
      dailyhourly,
      bydate,
      revenue, 
      clicks, 
      impressions, 
      totalRevenue, 
      totalClicks, 
      totalImpressions, 
      avgRevenue, 
      avgClicks, 
      avgImpressions,
      selected: label[0]
    }
  }
);
