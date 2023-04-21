# Leaflet Charts

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fps428%2Fleaflet-piechart&count_bg=%2317DAED&title_bg=%23555555&icon=probot.svg&icon_color=%23E7E7E7&title=Views&edge_flat=false)](https://hits.seeyoufarm.com)

## Pie Charts

Just add the pie chart marker using the basic code:

```javascript
L.piechartMarker(L.latLng([lat, long]), {
  data: [
    { name: "Apples", value: 25 },
    { name: "Oranges", value: 35 },
    { name: "Bananas", value: 20 },
    { name: "Pineapples", value: 30 },
  ],
}).addTo(map);
```

The pie charts look like:
<p align="center">
    <img src="https://github.com/ps428/leaflet-piechart/blob/master/pieExample.png" width=500>
</p>

## Doughnut Charts

Just add the doughnut chart marker using the basic code

```
L.doughnutchartMarker(L.latLng([lat, long]), {
  data: [
    { name: "Apples", value: 25 },
    { name: "Oranges", value: 35 },
    { name: "Bananas", value: 20 },
    { name: "Pineapples", value: 30 },
  ],
}).addTo(map);
```

The doughnut charts look like:
<p align="center">
    <img src="https://github.com/ps428/leaflet-piechart/blob/master/doughnutExample.png" width=500>
</p>
