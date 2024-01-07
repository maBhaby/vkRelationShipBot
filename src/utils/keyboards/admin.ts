import { Keyboard } from 'vk-io'

export const adminKeyboard = Keyboard.builder()
  .textButton({
    label: 'Показать все значения',
    payload: {
      action: 'showAllValue',
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .row()
  .textButton({
    label: 'Поменять значение юаня',
    payload: {
      action: 'changeYuan',
      label: 'юаня'
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .row()
  .textButton({
    label: 'Поменять значение комиссии',
    payload: {
      action: 'changeCommission',
      label: 'комиссии магазина (пример: 10 - это 10%)'
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .row()
  .textButton({
    label: 'change del shoese',
    payload: {
      action: 'changeDelShoes',
      label: 'доставки обуви'
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .row()
  .textButton({
    label: 'change del outwear',
    payload: {
      action: 'changeDelOutwear',
      label: 'доставки верхней одежды'
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .row()
  .textButton({
    label: 'change del tshirt',
    payload: {
      action: 'changeDelTShirt',
      label: 'доставки футболки и тд.'
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .row()
  .textButton({
    label: 'change del socks',
    payload: {
      action: 'changeDelSocks',
      label: 'доставки носок и тд.'
    },
    color: Keyboard.PRIMARY_COLOR,
  })
