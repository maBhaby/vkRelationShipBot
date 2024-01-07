export type TCalculateCost = 'shoes' | 'outwear' | 'tshirt' | 'socks' | ''
export type TPositiveCalcCost = Exclude<TCalculateCost, "">
