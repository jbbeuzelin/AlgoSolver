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
}