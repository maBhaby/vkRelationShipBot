import { VK, API, Upload } from 'vk-io'
import { HearManager } from '@vk-io/hear'

import {
  mainKeyboard,
  secondKeyboard,
  courseMoneyKeyboard
} from './utils/keyboards'

import { MESSAGES } from './messages'
import { REG_EXP } from './consts'
import path from 'path'
// import { ShopImage } from './assets'

const vk = new VK({
  token: process.env.VK_TOKEN,
})

const hearManager = new HearManager()
vk.updates.on('message_new', hearManager.middleware)

hearManager.hear(REG_EXP.DELIVERY, async (context) => {
  await context.send({
    message: MESSAGES.DELIVERY,
    keyboard: secondKeyboard,
  })
  await context.sendP
})

hearManager.hear(REG_EXP.INSTRUCTION, async (context) => {
  // await Promise.all([
  //   context.send({
  //     message:  MESSAGES.INSTRUCTION.FIRST,
  //     keyboard: secondKeyboard
  //   }),
  //   context.sendPhotos({
  //     values: [
  //       {
  //         value: path.resolve(__dirname, 'assets', 'shopImage.jpg')
  //       }
  //       ,
  //       // {
  //       //   value: path.resolve(__dirname, 'assets', 'selectSneaker.jpg')
  //       // }
  //     ]
  //   })
  // ])
  const shopImage = await vk.upload.messagePhoto({
    source: {
      values: {
        value: path.resolve(
          __dirname,
          'assets',
          'shopImage.jpg'
        ),
      },
    },
  })
  await context.send({
    message: MESSAGES.INSTRUCTION.FIRST,
    attachment: shopImage.toString(),
    keyboard: secondKeyboard,
  })

  const secondTabImg = await vk.upload.messagePhoto({
    source: {
      values: {
        value: path.resolve(
          __dirname,
          'assets',
          'secondTab.jpg'
        ),
      },
    },
  })

  await context.send({
    message: MESSAGES.INSTRUCTION.SECOND,
    attachment: secondTabImg.toString(),
    keyboard: secondKeyboard,
  })

  const selectItemsImgs = await vk.upload.messagePhoto({
    source: {
      values: 
      // {
      //   value: path.resolve(
      //     __dirname,
      //     'assets',
      //     'secondTab.jpg'
      //   ),
      // }
      [
        {
          value: path.resolve(
            __dirname,
            'assets',
            'selectSize2.jpg'
          ),
        },
        {
          value: path.resolve(
            __dirname,
            'assets',
            'selectSneaker2.jpg'
          ),
        }
      ],
    },
  }).then((res) => {console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!res', res)})
  .catch((err) => {console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!err', err)})
  

  // await context.send({
  //   message: MESSAGES.INSTRUCTION.THREE,
  //   attachment: (() => {
  //     console.log('selectItemsImgs', selectItemsImgs);
  //     return selectItemsImgs.toString()
  //   })(),
  //   keyboard: secondKeyboard,
  // })
})

hearManager.hear(REG_EXP.ABOUT_COURSE, async (context) => {
  await context.send({
    message: MESSAGES.ABOUT_COURSE,
    keyboard: secondKeyboard
  })
})

hearManager.hear(REG_EXP.ACTUAL_COURSE, async (context) => {
  await context.send({
    message: MESSAGES.ACTUAL_COURSE,
    keyboard: courseMoneyKeyboard
  })
})

hearManager.hear(REG_EXP.ORDER, async (context) => {
  await context.send({
    message: MESSAGES.PLACE_AN_ORDER,
  })
})

hearManager.hear(REG_EXP.FAQ, async (context) => {
  await context.sendPhotos({
    value:path.resolve(
      __dirname,
      'assets',
      'FAQ.jpg'
    )
  })

  await context.send({
    message: MESSAGES.FAQ,
    keyboard: secondKeyboard,
  })
})

hearManager.hear(REG_EXP.MENU, async (context) => {
  await context.send({
    message: MESSAGES.MENU,
    keyboard: secondKeyboard,
  })
})

hearManager.hear(REG_EXP.START, async (context) => {
  await context.send({
    message: MESSAGES.START_APP,
    keyboard: mainKeyboard,
  })
})

hearManager.hear(REG_EXP.UNICODE_CHARS, async (context) => {
  await context.send({
    message: MESSAGES.UNDEF_COMMAND,
    keyboard: mainKeyboard,
  })
})


vk.updates.start().catch(console.error)
