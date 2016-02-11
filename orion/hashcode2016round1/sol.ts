/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/bigint/bigint.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import * as bigint from 'BigInt';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Hashcode2016round1 extends solver.BaseSolver {

	public nbRows: number;
	public nbColumns: number;
	public nbDrones: number;
	public deadline: number;
	public maximumLoad: number;

	public P: number;
	public productsWeights: Array<number>;

	public W: number;
	public positionsW: Array<Array<number>>;
	public productAvailableByW: Array<Array<number>>;

	public C: number;
	public positionsC: Array<Array<number>>;
	public numberOfOrderedProductsByC: Array<number>;
	public orderedProductsByC: Array<Array<number>>;

	constructor(fileName: string) {
		super(fileName);

		this.readFile();

		this.writer.writeFile();
	}

	readFile(): void {
		[this.nbRows, this.nbColumns, this.nbDrones, this.deadline, this.maximumLoad] = _.map(this.reader.nextLine().split(' '), _.parseInt);

		this.P = _.parseInt(this.reader.nextLine());
		this.productsWeights = _.map(this.reader.nextLine().split(' '), _.parseInt);

		this.W = _.parseInt(this.reader.nextLine());
		this.positionsW = [];
		this.productAvailableByW = [];

		for (let i=0; i<this.W; i++) {
			this.positionsW.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
			this.productAvailableByW.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
		}

		this.C = _.parseInt(this.reader.nextLine());
		this.positionsC = [];
		this.numberOfOrderedProductsByC = [];
		this.orderedProductsByC = [];
		for (let i=0; i<this.C; i++) {
			this.positionsC.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
			this.numberOfOrderedProductsByC.push(_.parseInt(this.reader.nextLine()));
			this.orderedProductsByC.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
		}
	}
}

new Hashcode2016round1('practice');
