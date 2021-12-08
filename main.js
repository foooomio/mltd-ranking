import princess, { range } from 'https://cdn.jsdelivr.net/gh/foooomio/mltd-tools@1.0.0/princess-client.js';
import { drawChart } from './chart.js';

const eventId = 212;
const eventData = await princess.events.get({ eventId });
const rankingLogs = await princess.rankings.logs({ eventId, type: 'eventPoint', ranks: range(1, 15) });

drawChart(eventData, rankingLogs);

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
