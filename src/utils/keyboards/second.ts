import { Keyboard } from "vk-io";

export const secondKeyboard = Keyboard.builder()
  .textButton({
    label: 'ИНСТРУКЦИЯ',
    color: Keyboard.SECONDARY_COLOR
  })
  .textButton({
    label: 'ДОСТАВКА 🚚',
    color: Keyboard.SECONDARY_COLOR
  })
  .row()
  .textButton({
    label: 'ОФОРМИТЬ ЗАКАЗ ☑️',
    color: Keyboard.POSITIVE_COLOR
  })
  .textButton({
    label: 'АКТУАЛЬНЫЙ КУРС 💹',
    color: Keyboard.SECONDARY_COLOR
  })
  .row()
  .textButton({
    label: 'РАССЧИТАТЬ СТОИМОСТЬ',
    color: Keyboard.SECONDARY_COLOR
  })
  .textButton({
    label: 'ОТЗЫВЫ 🤝🏻',
    color: Keyboard.SECONDARY_COLOR
  })
  .row()
  .textButton({
    label: 'FAQ',
    color: Keyboard.SECONDARY_COLOR
  })