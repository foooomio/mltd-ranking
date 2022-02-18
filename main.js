import princess, { range } from 'https://cdn.jsdelivr.net/gh/foooomio/mltd-tools@1.0.0/princess-client.js';
import { drawChart } from './chart.js';

const events = await princess.events.get({
  type: ['theater', 'tour', 'anniversary', 'twinstage', 'tune', 'tale', 'treasure'],
});

const eventData = events.pop();

const rankingLogs = [];

for (let i = 1; i < 50; i += 10) {
  const logs = await princess.rankings.logs({
    eventId: eventData.id,
    type: 'eventPoint',
    ranks: range(i, i + 9),
  });
  rankingLogs.push(...logs);
}

drawChart(eventData, rankingLogs);

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
