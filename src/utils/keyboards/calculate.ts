import { Keyboard } from "vk-io";

export const calcKeyboard = Keyboard.builder()
.textButton({
  label: 'ОБУВЬ',
  payload: 'shoes',
  color: Keyboard.SECONDARY_COLOR
})
.textButton({
  label: 'ВЕРХНЯЯ ОДЕЖДА',
  payload: 'outwear',
  color: Keyboard.SECONDARY_COLOR
})
.row()
.textButton({
  label: 'ФУТБОЛКА,ШТАНЫ,ШОРТЫ,СУМКА,КЕПКА',
  payload: 'tshirt',
  color: Keyboard.SECONDARY_COLOR
})
.textButton({
  label: 'НОСКИ,ТРУСЫ',
  payload: 'socks',
  color: Keyboard.SECONDARY_COLOR
})
.row()
.textButton({
  label: 'МЕНЮ',
  color: Keyboard.SECONDARY_COLOR
})
