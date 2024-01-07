import { TPositiveCalcCost } from "src/types"

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
  OUTERWEAR:/ВЕРХНЯЯ ОДЕЖДА/gi,
  TSHIRT_PANTS_SHORTS: /ФУТБОЛКА,ШТАНЫ,ШОРТЫ,СУМКА,КЕПКА/gi,
  SOCKS_UNDERPANTS: /НОСКИ,ТРУСЫ/gi,
  OTHER_CATEGORY: /Другая категория/gi,
  CALC_MORE: /РАССЧИТАТЬ ЕЩЕ/gi,

  NUMBERS:/^\d+$/
}

export const PRICE_CONTENT: Record<TPositiveCalcCost, {
  dbKey: string
  category: string
}> = {
  shoes: {
    dbKey: 'deliveryToPetersburgShoese',
    category: 'Обувь'
  },
  socks: {
    dbKey: 'deliveryToPetersburgSocks',
    category: 'Носки, трусы'
  },
  outwear: {
    dbKey: 'deliveryToPetersburgOutwear',
    category: 'Верхняя одежда'
  },
  tshirt: {
    dbKey: 'deliveryToPetersburgTShirt',
    category: 'Футболка, штаны, шорты, сумка, кепка'
  },
}
