/// <reference path="../../typings/big-integer/big-integer.d.ts"/>
import * as bigInt from 'big-integer';

export module helper {

	export class MathHelper {
        /**
         * PGCD de 2 nombres
         */
		public static gcf(a, b) {
			return ( b == 0 ) ? (a):( this.gcf(b, a % b) );
		}
        
        /**
         * PPCM d'un tableau
         */
		public static lcm_nums(originalArray) {
			var ar = originalArray.slice(0);
			if (ar.length > 1) {
				ar.push( this.lcm( ar.shift() , ar.shift() ) );
				return this.lcm_nums( ar );
			} else {
				return ar[0];
			}
		}
        
        /**
         * PPCM de 2 nombres
         */
		private static lcm(a, b) {
			return ( a / this.gcf(a,b) ) * b;
		}
        
        public static modulo(a: number, b: number) {
            return ((a % b) + b) % b;
        }
	}
	
	export class NumberExtension {
        
		public static convertBinaryStringToBaseN(binary: string, n: number = 10) : BigInteger {
            let result : BigInteger = bigInt(0);

            for(let i = 0; i < binary.length; i++) {
                let binaryChar : string = binary.charAt(binary.length - i - 1);
                if(binaryChar === "1") {
                    let conversionStep : BigInteger = bigInt(binaryChar).multiply(bigInt(n).pow(i))
                    result = result.add(conversionStep);
                }
            }
            return result;
        }
        
        
        public static leastFactor(n : BigInteger) : BigInteger {
            if (isNaN(n.toJSNumber()) || !isFinite(n.toJSNumber())) return bigInt(NaN); 
            if (n.equals(0)) return bigInt.zero;  
            if (n.mod(1).greater(0) || n.multiply(n).lesser(2)) return bigInt(1);
            if (n.mod(2).equals(0)) return bigInt(2);  
            if (n.mod(3).equals(0)) return bigInt(3);  
            if (n.mod(5).equals(0)) return bigInt(5);
              
            let m : BigInteger = NumberExtension.BISqrtApprox(n);
            
            for (let i = 7; m.greaterOrEquals(i); i += 30) {
                if (n.mod(i).equals(0))    return bigInt(i);
                if (n.mod(i+4).equals(0))  return bigInt(i+4);
                if (n.mod(i+6).equals(0))  return bigInt(i+6);
                if (n.mod(i+10).equals(0)) return bigInt(i+10);
                if (n.mod(i+12).equals(0)) return bigInt(i+12);
                if (n.mod(i+16).equals(0)) return bigInt(i+16);
                if (n.mod(i+22).equals(0)) return bigInt(i+22);
                if (n.mod(i+24).equals(0)) return bigInt(i+24);
            }
            
            return n; 
        }
        
        public static BISqrtApprox(n: BigInteger) : BigInteger {
            // if(n.greaterOrEquals(Math.pow(2,100))) {
            //     // big int word
            //     let increment : number = Math.pow(2,26);
            //     let min : BigInteger = bigInt(increment);
            //     let max : BigInteger = bigInt(n).divide(increment);
                
            //     throw "limit of number reached"; 
            // }
            return bigInt(Math.ceil(Math.sqrt(n.toJSNumber())));
        } 
        
        public static XFirstDivisorsOf(n: BigInteger, x :number = 5) : Array<BigInteger> {
            	if (n.lesser(1))
            		throw "Argument error";
                let small : Array<BigInteger> = [];
                let large : Array<BigInteger> = [];
                
            	let end : BigInteger = NumberExtension.BISqrtApprox(n);
            	for (let i : BigInteger = bigInt(1); end.greaterOrEquals(i); i = i.add(1)) {
            		if (n.mod(i).equals(0)) {
                        if(i.equals(1) || i.equals(n)) {
                            continue;
                        }
            			small.push(i);
            			if (i.pow(2).notEquals(n))  // Don't include a square root twice
            				large.push(n.divide(i));
            		}
                    if(small.length + large.length >= x) {
                        break;
                    }
                    if(i.greaterOrEquals(Math.pow(10,7))) break;
            	}
            	large.reverse();
            	return small.concat(large);
            }
        }
        
        
//     listDivisors = function listDivisors(n) {
// 	if (n < 1)
// 		throw "Argument error";
	
// 	var small = [];
// 	var large = [];
// 	var end = Math.floor(Math.sqrt(n));
// 	for (var i = 1; i <= end; i++) {
// 		if (n % i == 0) {
// 			small.push(i);
// 			if (i * i != n)  // Don't include a square root twice
// 				large.push(n / i);
// 		}
// 	}
// 	large.reverse();
// 	return small.concat(large);
// }
}