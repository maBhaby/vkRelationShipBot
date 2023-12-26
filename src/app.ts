import { VK } from 'vk-io'
import { HearManager } from '@vk-io/hear'

import { mainKeyboard, secondKeyboard } from './utils/keyboards'

import { MESSAGES } from './messages'
import { REG_EXP } from './consts'

const vk = new VK({
  token: process.env.VK_TOKEN
})
const hearManager = new HearManager()
vk.updates.on('message_new', hearManager.middleware)

hearManager.hear(REG_EXP.DELIVERY, async (context) => {
  await context.send({
    message:  MESSAGES.DELIVERY,
    keyboard: secondKeyboard
  })
})

hearManager.hear(REG_EXP.INSTRUCTION, async (context) => {
  await context.send({
    message:  MESSAGES.INSTRUCTION,
    keyboard: secondKeyboard
  })
})

hearManager.hear(REG_EXP.MENU, async (context) => {
  await context.send({
    message:  MESSAGES.MENU,
    keyboard: secondKeyboard
  })
})

hearManager.hear(REG_EXP.START, async (context) => {
  await context.send({
    message:  MESSAGES.START_APP,
    keyboard: mainKeyboard
  })
})

hearManager.hear(REG_EXP.UNICODE_CHARS, async (context) => {
  await context.send({
    message: MESSAGES.UNDEF_COMMAND,
    keyboard: mainKeyboard
  })
})


// const catsPurring = [
//   'http://ronsen.org/purrfectsounds/purrs/trip.mp3',
//   'http://ronsen.org/purrfectsounds/purrs/maja.mp3',
//   'http://ronsen.org/purrfectsounds/purrs/chicken.mp3'
// ]

// hearManager.hear('/purr', async (context: any) => {
//   const link = catsPurring[Math.floor(Math.random() * catsPurring.length)]

//   await Promise.all([
//     context.send('Wait for the uploads purring 😻'),

//     context.sendAudioMessage({
//       value: link
//     })
//   ])
// })

vk.updates.start().catch(console.error)
