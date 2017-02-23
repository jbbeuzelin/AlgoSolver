'use strict'

import * as _ from 'lodash';

import { BaseSolver } from '../../bin/core/BaseSolver';
import { MathHelper } from '../../bin/core/Helper';

class Hashcodeofficial extends BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		//let testCases = _.parseInt(this.read(file, lineIndex));
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
		const file = this.reader.getFile().split('\n');
		let lineIndex = 0;

		const [ V, E, R, C, X ] = this.read(file, lineIndex).split(' ').map(_.parseInt);

		const videoSizes = this.read(file, lineIndex).split(' ').map(_.parseInt);

		let endpoints = [];
		let caches = [];

		_.times(E, (i) => {
			let line = this.read(file, lineIndex).split(' ').map(_.parseInt);
			let endpoint = { id: i, latency: line[0], nbOcCacheServers: line[1], links: [] };

			console.log('parsed a cache')
			_.times(endpoint.nbOcCacheServers, () => {
				line = this.read(file, lineIndex).split(' ').map(_.parseInt);
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
			let line = this.read(file, lineIndex).split(' ').map(_.parseInt);
			videos.push({ id: line[0], fromEndPoint: line[1], nbRequests: line[2], size: videoSizes[line[0]] });
		});

		endpoints.forEach(endpoint => {
			endpoint.videos = _.filter(videos, v => v.fromEndPoint === endpoint.id);
		});

		console.log('parsed 2')
		let result = [];

		_.each(caches, cache => {
			let localVideos = _.flatMap(cache.endpoints, e => e.videos);
			let groupedVideos = _.groupBy(localVideos, v => v.id);
			let videosWithCount = _.map(groupedVideos, (val, key) => ({ id: +key, nbDownloads: _.sumBy(val, 'nbRequests')}));

			let sortedVideos = _.sortBy(videosWithCount, v => v.nbDownloads);

			let cacheCapacity = 0;
			let videosOnCache = [];
			let i = 0;

			while (cacheCapacity < X && i < sortedVideos.length) {
				let size = _.find(videos, v => v.id === sortedVideos[i].id).size;
				if (cacheCapacity + size < X) {
					cacheCapacity += size;
					videosOnCache.push(sortedVideos[i].id)
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
