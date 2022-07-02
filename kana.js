import princess, { range } from 'https://cdn.jsdelivr.net/gh/foooomio/mltd-tools@1.0.0/princess-client.js';
import { drawChart } from './chart.js';

const eventId = 241;
const idolId = 36;

const eventData = await princess.events.get({ eventId });
const rankingLogs = [
  await princess.rankings.logsByIdol({
    eventId,
    idolId,
    ranks: range(1, 10),
  }),
  await princess.rankings.logsByIdol({
    eventId,
    idolId,
    ranks: range(11, 20),
  }),
].flat();

drawChart(eventData, rankingLogs);

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
