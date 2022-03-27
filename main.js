import princess, { range } from 'https://cdn.jsdelivr.net/gh/foooomio/mltd-tools@1.0.0/princess-client.js';
import { drawChart } from './chart.js';

const eventsPromise = princess.events.get({
  type: ['theater', 'tour', 'anniversary', 'twinstage', 'tune', 'tale', 'treasure'],
});

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  e.target.style.display = 'none';

  const eventData = (await eventsPromise).pop();
  const rank = Number(e.target.rank.value);
  const rankingLogs = [];

  for (let i = rank; i < rank + 20; i += 10) {
    const logs = await princess.rankings.logs({
      eventId: eventData.id,
      type: 'eventPoint',
      ranks: range(i, i + 9),
    });
    rankingLogs.push(...logs);
  }

  drawChart(eventData, rankingLogs);
});

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
