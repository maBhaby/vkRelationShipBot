export type TCalculateCost =
  | 'shoes'
  | 'outwear'
  | 'tshirt'
  | 'socks'
  | ''
export type TPositiveCalcCost = Exclude<TCalculateCost, ''>

export type TAdminActions =
  | 'showAllValue'
  | 'changeYuan'
  | 'changeCommission'
  | 'changeDelShoes'
  | 'changeDelOutwear'
  | 'changeDelTShirt'
  | 'changeDelSocks'
