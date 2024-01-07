import { TPositiveCalcCost } from "src/types";
import { Keyboard } from "vk-io";

export const recalculationKeyboard = (calcType: TPositiveCalcCost) => Keyboard.builder()
.textButton({
  label: 'ОФОРМИТЬ ЗАКАЗ',
  color: Keyboard.POSITIVE_COLOR
})
.textButton({
  label: 'РАССЧИТАТЬ ЕЩЕ',
  payload: calcType,
  color: Keyboard.SECONDARY_COLOR
})
.row()
.textButton({
  label: 'ДРУГАЯ КАТЕГОРИЯ',
  color: Keyboard.SECONDARY_COLOR
})
.row()
.textButton({
  label: 'МЕНЮ',
  color: Keyboard.SECONDARY_COLOR
})
