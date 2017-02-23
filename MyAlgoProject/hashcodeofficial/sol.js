'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("lodash");
var BaseSolver_1 = require("../../bin/core/BaseSolver");
var Hashcodeofficial = (function (_super) {
    __extends(Hashcodeofficial, _super);
    function Hashcodeofficial(fileName) {
        var _this = _super.call(this, fileName) || this;
        //let testCases = _.parseInt(this.reader.nextLine());
        var testCases = 1;
        console.time('Time tacken by solver');
        _.times(testCases, function (i) { return _this.solveCase(i); });
        console.timeEnd('Time tacken by solver');
        _this.writer.writeFile();
        return _this;
    }
    Hashcodeofficial.prototype.read = function (file, lineIndex) {
        lineIndex++;
        return file[lineIndex - 1];
    };
    Hashcodeofficial.prototype.solveCase = function (testCase) {
        var _this = this;
        var _a = this.reader.nextLine().split(' ').map(_.parseInt), V = _a[0], E = _a[1], R = _a[2], C = _a[3], X = _a[4];
        var videoSizes = this.reader.nextLine().split(' ').map(_.parseInt);
        var endpoints = [];
        var caches = [];
        _.times(E, function (i) {
            var line = _this.reader.nextLine().split(' ').map(_.parseInt);
            var endpoint = { id: i, latency: line[0], nbOcCacheServers: line[1], links: [] };
            console.log('parsed a cache');
            _.times(endpoint.nbOcCacheServers, function () {
                line = _this.reader.nextLine().split(' ').map(_.parseInt);
                endpoint.links.push({ cacheIndex: line[0], latency: line[1] });
                var existingCache = _.find(caches, function (c) { return c.cacheIndex === line[0]; });
                if (!!existingCache) {
                    existingCache.endpoints.push(endpoint);
                }
                else {
                    caches.push({ cacheIndex: line[0], endpoints: [endpoint] });
                }
            });
            endpoints.push(endpoint);
        });
        console.log('parsed 1');
        var videos = [];
        _.times(R, function () {
            var line = _this.reader.nextLine().split(' ').map(_.parseInt);
            var endpoint = _.find(endpoints, function (e) { return e.id === line[1]; });
            if (videoSizes[line[0]] < X) {
                videos.push({ id: line[0], fromEndPoint: line[1], nbRequests: line[2], size: videoSizes[line[0]], latencyFromDbStore: endpoint.latency });
            }
        });
        endpoints.forEach(function (endpoint) {
            endpoint.videos = _.filter(videos, function (v) { return v.fromEndPoint === endpoint.id; });
        });
        console.log('parsed 2');
        var result = [];
        _.each(caches, function (cache) {
            var localVideos = _.flatMap(cache.endpoints, function (e) { return e.videos; });
            var sVideos = _.map(localVideos, function (v) {
                var endpoint = _.find(endpoints, function (e) { return e.id === v.fromEndPoint; });
                var latency = endpoint.links.find(function (l) { return l.cacheIndex === cache.cacheIndex; }).latency;
                return ({ id: v.id, weight: v.size, score: (v.nbRequests / v.size) * (1 - (latency / v.latencyFromDbStore)) });
            });
            var gVideos = _.chain(sVideos)
                .groupBy(function (v) { return v.id; })
                .map(function (val, key) {
                return ({ id: +key, score: _.sumBy(val, 'score') });
            })
                .sortBy(function (v) { return -v.score; }).value();
            // let groupedVideos = _.groupBy(localVideos, v => v.id);
            // let videosWithCount = _.map(groupedVideos, (val, key) => ({ id: +key, nbDownloads: _.sumBy(val, 'nbRequests')}));
            // let sortedVideos = _.sortBy(videosWithCount, v => v.nbDownloads + v.);
            var cacheCapacity = 0;
            var videosOnCache = [];
            var i = 0;
            console.log('did a cache');
            while (cacheCapacity < X && i < gVideos.length) {
                var video = _.find(videos, function (v) { return v.id === gVideos[i].id; });
                video.nbRequests /= 2;
                if (cacheCapacity + video.size < X) {
                    cacheCapacity += video.size;
                    videosOnCache.push(gVideos[i].id);
                }
                i++;
            }
            result.push({ cacheId: cache.cacheIndex, videos: videosOnCache });
        });
        this.writer.writeToBuffer("" + result.length);
        _.each(result, function (r) { return _this.writer.writeToBuffer(r.cacheId + " " + r.videos.join(' ')); });
    };
    return Hashcodeofficial;
}(BaseSolver_1.BaseSolver));
new Hashcodeofficial('./practice');
