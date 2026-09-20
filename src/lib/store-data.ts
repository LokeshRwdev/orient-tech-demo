import tyreImage from "@/assets/tyre-wheel-product.jpg";

export type Tyre = {
  id: string;
  brand: string;
  name: string;
  size: string;
  type: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
};

export const tyres: Tyre[] = [
  { id: "goodyear-reliant", brand: "GOODYEAR", name: "Reliant All-Season", size: "245/45R18 96V", type: "All-Season", rating: 4.6, reviews: 1428, price: 128, originalPrice: 156, badge: "BEST SELLER", image: tyreImage },
  { id: "michelin-defender", brand: "MICHELIN", name: "Defender 2", size: "225/65R17 102H", type: "All-Season", rating: 4.8, reviews: 892, price: 189, badge: "TOP RATED", image: tyreImage },
  { id: "continental-control", brand: "CONTINENTAL", name: "ControlContact Tour A/S", size: "235/55R19 101H", type: "Touring", rating: 4.7, reviews: 614, price: 173, originalPrice: 199, image: tyreImage },
  { id: "bridgestone-weatherpeak", brand: "BRIDGESTONE", name: "WeatherPeak", size: "215/55R17 94V", type: "All-Weather", rating: 4.8, reviews: 526, price: 202, badge: "NEW", image: tyreImage },
  { id: "pirelli-scorpion", brand: "PIRELLI", name: "Scorpion AS Plus 3", size: "255/55R20 107H", type: "SUV / Crossover", rating: 4.7, reviews: 438, price: 236, image: tyreImage },
  { id: "cooper-discoverer", brand: "COOPER", name: "Discoverer Road + Trail AT", size: "265/70R17 115T", type: "All-Terrain", rating: 4.5, reviews: 327, price: 214, originalPrice: 239, badge: "SAVE $25", image: tyreImage },
];

export const featuredTyres = tyres.slice(0, 4);