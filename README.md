# Leaflet Charts

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
    <img src="https://github.com/ps428/leaflet-piechart/blob/master/doughnutExample.png" width=500>
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
    <img src="https://github.com/ps428/leaflet-piechart/blob/master/pieExample.png" width=500>
</p>
