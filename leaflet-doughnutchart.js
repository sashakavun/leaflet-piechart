/*global L */
(function () {
    'use strict';

    /**
     * Doughnutchart Icon
     * @type {L.DoughnutchartIcon}
     * @extends {L.CanvasIcon}
     */
    L.DoughnutchartIcon = L.CanvasIcon.extend({
        options: {
            iconSize: [48, 48],
            iconAnchor: [24, 24],
            popupAnchor: [24, 24],
            className: 'leaflet-doughnutchart-icon',
            valueField: 'value',
            nameField: 'name'
            /*
             data: [
                 {
                     name: 'Value',
                     value: 20, // Percentage or raw value
                     style: {
                         fillStyle: 'rgba(255,0,0,.5)',
                         strokeStyle: 'rgba(255,0,0,.5)',
                         lineWidth: 1
                     }
                 },
             ...
             ]
             */
        },

        /**
         * @param {HTMLCanvasElement} icon
         * @param {string} type
         */
        _setIconStyles: function (icon, type) {
            var data = this.options.data;
            if ((type == 'icon') && data && L.Util.isArray(data) && icon.getContext) {
                var ctx = icon.getContext('2d');
                var size = L.point(this.options.iconSize);
                var center = size.divideBy(2);
                ctx.clearRect(0, 0, size.x, size.y);

                var valueField = this.options.valueField;
                var total = this._getTotal(data, valueField);
                var x = center.x;
                var y = center.y;
                if (total) {
                    var radius = Math.min(x, y);
                    var fraction = Math.PI / total * 2;
                    var startAngle = -Math.PI / 2;
                    var stopAngle;
                    var style;
                    for (var i = 0, l = data.length; i < l; i++) {
                        ctx.beginPath();
                        style = data[i].style || this._getStyle(i, l);
                        this._applyStyle(ctx, style);
                        stopAngle = fraction * data[i][valueField] + startAngle;
                        ctx.arc(x, y, radius - Math.ceil((style.lineWidth || 0) / 2), startAngle, stopAngle);
                        ctx.stroke();
                        ctx.lineTo(x, y);
                        startAngle = stopAngle;
                        // ctx.fill();
                        ctx.closePath();
                    }
                }
            }
            L.CanvasIcon.prototype._setIconStyles.apply(this, arguments);
        },

        /**
         * @param {Object[]} data Array of objects
         * @param {string} field Field to summarize
         * @returns {number}
         * @private
         */
        _getTotal: function (data, field) {
            var total = 0;
            for (var i = 0, l = data.length; i < l; i++) {
                total += (+data[i][field]);
            }
            return total;
        },

        /**
         * Applies context style
         * @param {CanvasRenderingContext2D} ctx
         * @param {Object} props
         * @private
         */
        _applyStyle: function (ctx, props) {
            for (var i in props) {
                ctx[i] = props[i];
            }
        },

        /**
         * Generates style for chart segment
         * @param {number} segment Segment number
         * @param {number} total Total segments
         * @returns {{fillStyle: string, strokeStyle: string, lineWidth: number}}
         * @private
         */
        _getStyle: function (segment, total) {
            /**
             * Converts an HSL color value to RGB. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
             * Assumes h, s, and l are contained in the set [0, 1] and
             * returns r, g, and b in the set [0, 255].
             * @url http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
             *
             * @param {number} h The hue
             * @param {number} s The saturation
             * @param {number} l The lightness
             * @return {string} The RGB representation
             */
            var hslToRgb = function (h, s, l) {
                var r, g, b;
                if (s == 0) {
                    r = g = b = l; // achromatic
                } else {
                    var hue2rgb = function (p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };

                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }

                return Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255);
            };

            var angle = 360 / (total * 2.5);
            var offset = (segment % 2) * total;
            // this hue results in ambigious results once there are more than 8 inputs, so using basic math here
            var hue = (angle * (offset + (segment - (segment % 2)))) / 360;
            var rgb = hslToRgb((segment+1)/total, 0.7, 0.5);
            console.log("----------");
            console.log("----------");
            console.log("----------");
            console.log(rgb);
            console.log(segment,total);
            console.log(segment/total);
            console.log("----------");
            console.log("----------");
            console.log("----------");
            return {
                fillStyle: 'rgba(' + rgb + ',0.7)',
                strokeStyle: 'rgba(' + rgb + ',1.0)',
                lineWidth: 10
            };
        }
    });

    /**
     * Doughnut char Icon factory
     * @param {Object} options
     * @returns {L.DoughnutchartIcon}
     */
    L.doughnutchartIcon = function (options) {
        return new L.DoughnutchartIcon(options);
    };

    /**
     * Doughnut chart Marker
     * @type {L.Marker}
     */
    L.DoughnutchartMarker = L.Marker.extend({
        options: {
            icon: null,
            radius: 20,
            riseOnHover: true
        },

        initialize: function (latlng, options) {
            var opts = {};
            L.Util.extend(opts, options);
            if (opts.radius) {
                var diameter = opts.radius * 2;
                opts.iconSize = [diameter, diameter];
                opts.iconAnchor = [opts.radius, opts.radius];
            }
            opts.icon = L.doughnutchartIcon(opts);
            L.Marker.prototype.initialize.apply(this, [latlng, opts]);
        }
    });

    /**
     * Doughnut chart Marker factory
     * @param {L.LatLng} latlng
     * @param {Object} options
     * @returns {L.DoughnutchartMarker}
     */
    L.doughnutchartMarker = function (latlng, options) {
        return new L.DoughnutchartMarker(latlng, options);
    }

}());