'use strict'

import * as _ from 'lodash';

import { BaseSolver } from '../../bin/core/BaseSolver';
import { MathHelper } from '../../bin/core/Helper';

class Hashcodeofficial extends BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		//let testCases = _.parseInt(this.reader.nextLine());
		let testCases = 1;

		console.time('Time tacken by solver');
		_.times(testCases, (i: number) => this.solveCase(i));
		console.timeEnd('Time tacken by solver');

		this.writer.writeFile();
	}

	read(file, lineIndex) {
		lineIndex++;
		return file[lineIndex - 1];
	}
	solveCase(testCase: number): void {
		const [ V, E, R, C, X ] = this.reader.nextLine().split(' ').map(_.parseInt);

		const videoSizes = this.reader.nextLine().split(' ').map(_.parseInt);

		let endpoints = [];
		let caches = [];

		_.times(E, (i) => {
			let line = this.reader.nextLine().split(' ').map(_.parseInt);
			let endpoint = { id: i, latency: line[0], nbOcCacheServers: line[1], links: [] };

			console.log('parsed a cache')
			_.times(endpoint.nbOcCacheServers, () => {
				line = this.reader.nextLine().split(' ').map(_.parseInt);
				endpoint.links.push({cacheIndex: line[0], latency: line[1] })

				const existingCache = _.find(caches, c => c.cacheIndex === line[0]);

				if (!!existingCache) {
					existingCache.endpoints.push(endpoint);
				} else {
					caches.push({cacheIndex: line[0], endpoints: [endpoint]})
				}

			})
			endpoints.push(endpoint);
		});

		console.log('parsed 1')
		let videos = []
		_.times(R, () => {
			let line = this.reader.nextLine().split(' ').map(_.parseInt);
			let endpoint = _.find(endpoints, e => e.id === line[1]);
			if (videoSizes[line[0]] < X) {
				videos.push({ id: line[0], divideBy: 1, fromEndPoint: line[1], nbRequests: line[2], size: videoSizes[line[0]], latencyFromDbStore: endpoint.latency });
			}
		});

		endpoints.forEach(endpoint => {
			endpoint.videos = _.filter(videos, v => v.fromEndPoint === endpoint.id);
		});

		console.log('parsed 2')
		let result = [];

		_.each(caches, cache => {
			let localVideos = _.flatMap(cache.endpoints, e => e.videos);

			
			let sVideos = _.map(localVideos, v => {
				let endpoint = _.find(endpoints, e => e.id === v.fromEndPoint);
				
				let latency = endpoint.links.find(l => l.cacheIndex === cache.cacheIndex).latency;

				return ({id: v.id, divide: v.divideBy, score: (v.nbRequests / v.size) * (1 - (latency / v.latencyFromDbStore ))}) 
			});
			let gVideos = _.chain(sVideos)
				.groupBy(v => v.id)
				.map((val, key) => {
					return ({id: +key, score: 1 }) //_.sumBy(val, 'score') / val[0].divide })
				})
				.shuffle().value();

			// let groupedVideos = _.groupBy(localVideos, v => v.id);
			// let videosWithCount = _.map(groupedVideos, (val, key) => ({ id: +key, nbDownloads: _.sumBy(val, 'nbRequests')}));

			// let sortedVideos = _.sortBy(videosWithCount, v => v.nbDownloads + v.);

			let cacheCapacity = 0;
			let videosOnCache = [];
			let i = 0;

			console.log('did a cache')
			while (cacheCapacity < X && i < gVideos.length) {
				let video = _.find(videos, v => v.id === gVideos[i].id);

				video.divideBy += cache.endpoints.length;

				if (cacheCapacity + video.size < X) {
					cacheCapacity += video.size;
					videosOnCache.push(gVideos[i].id)
				}
				i++;

			}

			result.push({cacheId: cache.cacheIndex, videos: videosOnCache});
		});

		this.writer.writeToBuffer(`${result.length}`);
		_.each(result, r => this.writer.writeToBuffer(`${r.cacheId} ${r.videos.join(' ')}`));
		
	}
}

new Hashcodeofficial('./practice');
