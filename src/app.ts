import { VK, Keyboard } from 'vk-io'
import { HearManager } from '@vk-io/hear'

const vk = new VK({
  token: process.env.VK_TOKEN
})

const hearManager = new HearManager()
const builder = Keyboard.builder()
  .textButton({
    label: 'РАССЧИТАТЬ СТОИМОСТЬ',
    payload: {
      command: 'cat'
    },
    color: Keyboard.PRIMARY_COLOR
  })
  .textButton({
    label: 'ОФОРМИТЬ ЗАКАЗ',
    payload: {
      command: 'buy'
    },
    color: Keyboard.POSITIVE_COLOR
  })
  .row()
  .textButton({
    label: 'МЕНЮ',
    payload: {
      command: 'menu'
    },
    color: Keyboard.PRIMARY_COLOR
  })

vk.updates.on('message_new', hearManager.middleware)


hearManager.hear('Начать', async (context, next) => {
  await context.send({
    message: 'Привет братишка',
    keyboard: builder
  })
  next()
})

hearManager.hear('cat', async (context) => {
  await Promise.all([
    context.send('Wait for the uploads awesome 😻'),

    context.sendPhotos({
      value: 'https://loremflickr.com/400/300/'
    })
  ])
})

hearManager.hear(['/time', '/date'], async (context) => {
  await context.send(String(new Date()))
})

hearManager.hear(/^\/reverse (.+)/i, async (context) => {
  await context.send(context.$match[1].split('').reverse().join(''))
})

const catsPurring = [
  'http://ronsen.org/purrfectsounds/purrs/trip.mp3',
  'http://ronsen.org/purrfectsounds/purrs/maja.mp3',
  'http://ronsen.org/purrfectsounds/purrs/chicken.mp3'
]

hearManager.hear('/purr', async (context: any) => {
  const link = catsPurring[Math.floor(Math.random() * catsPurring.length)]

  await Promise.all([
    context.send('Wait for the uploads purring 😻'),

    context.sendAudioMessage({
      value: link
    })
  ])
})

vk.updates.start().catch(console.error)
// vk.api.messages.send({
//     message: 'Привет! Выберите действие:',
//     keyboard: builder,
//     random_id: Math.random(),
//     user_id: vk.api.
// })
