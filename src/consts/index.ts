import { TAdminActions, TPositiveCalcCost } from 'src/types'

export const REG_EXP = {
  UNICODE_CHARS: /\p{L}/gu,
  MENU: /Меню/gi,
  START: /Начать/gi,
  INSTRUCTION: /Инструкция/gi,
  DELIVERY: /Доставка/gi,
  FAQ: /FAQ/gi,
  ORDER: /ОФОРМИТЬ ЗАКАЗ/gi,
  ACTUAL_COURSE: /АКТУАЛЬНЫЙ КУРС/gi,
  ABOUT_COURSE: /Подробнее о курсе/gi,
  CALCULATE_COST: /РАССЧИТАТЬ СТОИМОСТЬ/gi,

  SHOES: /обувь/gi,
  OUTERWEAR: /ВЕРХНЯЯ ОДЕЖДА/gi,
  TSHIRT_PANTS_SHORTS: /ФУТБОЛКА,ШТАНЫ,ШОРТЫ,СУМКА,КЕПКА/gi,
  SOCKS_UNDERPANTS: /НОСКИ,ТРУСЫ/gi,
  OTHER_CATEGORY: /Другая категория/gi,
  CALC_MORE: /РАССЧИТАТЬ ЕЩЕ/gi,

  ADMIN_INIT: /open-admin-panel/,
  ADMIN_SHOW_ALL: /Показать все значения/gi,
  ADMIN_CHANGE_YUANE: /Поменять значение юаня/gi,
  ADMIN_CHANGE_COMMISSION: /Поменять значение комиссии/gi,
  ADMIN_CHANGE_SHOES: /change del shoese/gi,
  ADMIN_CHANGE_OUTWEAR: /change del outwear/gi,
  ADMIN_CHANGE_TSHIRT: /change del tshirt/gi,
  ADMIN_CHANGE_SOCKS: /change del socks/gi,

  NUMBERS: /^\d+(\.\d+)?$/,
}

export const PRICE_CONTENT: Record<
  TPositiveCalcCost,
  {
    dbKey: string
    category: string
  }
> = {
  shoes: {
    dbKey: 'deliveryToPetersburgShoese',
    category: 'Обувь',
  },
  socks: {
    dbKey: 'deliveryToPetersburgSocks',
    category: 'Носки, трусы',
  },
  outwear: {
    dbKey: 'deliveryToPetersburgOutwear',
    category: 'Верхняя одежда',
  },
  tshirt: {
    dbKey: 'deliveryToPetersburgTShirt',
    category: 'Футболка, штаны, шорты, сумка, кепка',
  },
}

export const ADMIN_ACTIONS: TAdminActions[] = [
  'showAllValue',
  'changeYuan',
  'changeCommission',
  'changeDelOutwear',
  'changeDelShoes',
  'changeDelSocks',
  'changeDelTShirt'
]

export const DB_KEYS_FOR_CHANGE: Record<
  Exclude<TAdminActions, 'showAllValue'>,
  string
> = {
  changeYuan: 'yuanRate',
  changeCommission: 'percentageCommission',
  changeDelShoes: 'deliveryToPetersburgShoese',
  changeDelOutwear: 'deliveryToPetersburgOutwear',
  changeDelTShirt: 'deliveryToPetersburgTShirt',
  changeDelSocks: 'deliveryToPetersburgSocks',
}
