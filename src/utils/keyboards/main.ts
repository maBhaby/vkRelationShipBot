import { Keyboard } from "vk-io";

export const mainKeyboard = Keyboard.builder()
  .textButton({
    label: 'РАССЧИТАТЬ СТОИМОСТЬ',
    color: Keyboard.SECONDARY_COLOR
  })
  .textButton({
    label: 'ОФОРМИТЬ ЗАКАЗ ☑️',
    color: Keyboard.POSITIVE_COLOR
  })
  .row()
  .textButton({
    label: 'МЕНЮ',
    color: Keyboard.SECONDARY_COLOR
  })