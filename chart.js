const HOUR = 60 * 60 * 1000;

Highcharts.setOptions({
  lang: {
    shortWeekdays: ['日', '月', '火', '水', '木', '金', '土'],
    thousandsSep: ',',
  },
});

export function drawChart(eventData, rankingLogs) {
  Highcharts.chart('chart', {
    title: {
      text: eventData.name.replace(/[〜～]/, '<br>$&'),
    },
    subtitle: {
      text: '情報元：<a href="https://matsurihi.me">matsurihi.me</a>',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        minute: '%H:%M',
        day: '%m/%d (%a)',
      },
      softMax: Date.parse(eventData.schedule.endDate),
      plotLines: [{
        value: Date.parse(eventData.schedule.boostBeginDate),
        width: 2,
        color: '#ffaaaa',
        zIndex: 1,
        label: {
          text: '折り返し',
          rotation: 0,
          y: 16,
        },
      }, {
        value: Date.parse(eventData.schedule.endDate),
        width: 2,
        color: '#ffaaaa',
        zIndex: 1,
      }],
      gridLineWidth: 1,
      tickInterval: 24 * HOUR,
      minorTicks: true,
      minorTickInterval: 3 * HOUR,
      startOnTick: true,
      endOnTick: true,
      crosshair: true,
    },
    yAxis: {
      title: undefined,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      animation: false,
      shared: true,
      xDateFormat: '%m/%d (%a) %H:%M',
    },
    time: {
      timezoneOffset: -540,
    },
    chart: {
      animation: false,
      zoomType: 'x',
    },
    plotOptions: {
      line: {
        animation: false,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
        },
      },
    },
    series: rankingLogs.map(({ rank, data }) => ({
      name: rank + '位',
      data: [
        [Date.parse(eventData.schedule.beginDate), 0],
        ...data.map(({ score, summaryTime }) => [Date.parse(summaryTime), score]),
      ],
    })),
  });
}
