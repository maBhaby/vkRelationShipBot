import { Keyboard } from "vk-io";

export const courseMoneyKeyboard = Keyboard.builder()
  .textButton({
    label: 'ПОДРОБНЕЕ О КУРСЕ',
    color: Keyboard.SECONDARY_COLOR
  })
  .row()
  .textButton({
    label: 'МЕНЮ',
    color: Keyboard.SECONDARY_COLOR
  })