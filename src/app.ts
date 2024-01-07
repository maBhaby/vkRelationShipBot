import { VK } from 'vk-io'
import { HearManager } from '@vk-io/hear'
import path from 'path'

import jsonDB from './db/index.json'

import {
  mainKeyboard,
  secondKeyboard,
  courseMoneyKeyboard,
  calcKeyboard,
  recalculationKeyboard
} from './utils/keyboards'

import { MESSAGES } from './messages'
import { REG_EXP, PRICE_CONTENT } from './consts'
import { TCalculateCost } from './types'

const vk = new VK({
  token: process.env.VK_TOKEN,
})

// ! this so bad
const state: { current: TCalculateCost } = {
  current: '',
}

const hearManager = new HearManager()

vk.updates.on('message_new', hearManager.middleware)

hearManager.hear(REG_EXP.DELIVERY, async (context) => {
  await context.send({
    message: MESSAGES.DELIVERY,
    keyboard: secondKeyboard,
  })
})
// ------------------------------------------------------------------------

hearManager.hear([REG_EXP.CALCULATE_COST, REG_EXP.OTHER_CATEGORY], async (ctx) => {
  await ctx.send({
    message: MESSAGES.CALCULATE_COST,
    keyboard: calcKeyboard,
  })
})

hearManager.hear(
  [
    REG_EXP.SHOES,
    REG_EXP.SOCKS_UNDERPANTS,
    REG_EXP.OUTERWEAR,
    REG_EXP.TSHIRT_PANTS_SHORTS,
    REG_EXP.CALC_MORE
  ],
  async (ctx) => {
    if (ctx.messagePayload) {
      state.current = ctx.messagePayload
    }

    await ctx.send({
      message: MESSAGES.WRITE_PRICE,
      keyboard: calcKeyboard,
    })
  }
)

hearManager.hear(REG_EXP.NUMBERS, async (context, next) => {
  if (state.current !== '') {
    console.log('state.current', state.current);

    const yuanPrice = Number(context.text)
    const currentDelivery = jsonDB[PRICE_CONTENT[state.current].dbKey]

    const yuanToRub = +((yuanPrice * jsonDB.yuanRate).toFixed(2))
    const priceProduct = currentDelivery + yuanToRub
    const priceProductWithCommission = Math.ceil(priceProduct * (1 + jsonDB.percentageCommission / 100))

    console.log('yuanToRub', yuanToRub);
    console.log('priceProduct',  jsonDB[PRICE_CONTENT[state.current].dbKey] + yuanToRub);
    console.log('priceProductWithCommission', priceProduct * jsonDB.percentageCommission / 100);

    await context.send({
      message: MESSAGES.TOTAL_PRICE({
        fullPrice: priceProductWithCommission,
        yuanCourse: jsonDB.yuanRate,
        yuanPrice,
        commission: jsonDB.percentageCommission,
        delivery: currentDelivery,
        category: PRICE_CONTENT[state.current].category
      }),
      keyboard: recalculationKeyboard(state.current)
    })
  } else {
    return next()
  }
})
/**
 * `
        Цена составит ${priceProductWithCommission}
        юань к рублю: ${yuanToRub} (по курсу ${jsonDB.yuanRate})  
        Доставка: ${jsonDB[PRICE_CONTENT[state.current].dbKey]}
        Коммисия: ${priceProduct * jsonDB.percentageCommission / 100} (Доставка + юань к рублю)
      `
 */
// ------------------------------------------------------------------------
hearManager.hear(REG_EXP.INSTRUCTION, async (context) => {
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

  const selectSizeImg = await vk.upload.messagePhoto({
    source: {
      values: {
        value: path.resolve(
          __dirname,
          'assets',
          'selectSneaker.jpg'
        ),
      },
    },
  })

  await context.send({
    message: MESSAGES.INSTRUCTION.THREE,
    attachment: selectSizeImg.toString(),
    keyboard: secondKeyboard,
  })

  await context.sendPhotos({
    value: path.resolve(
      __dirname,
      'assets',
      'selectSize.jpg'
    ),
  })

  const priceImg = await vk.upload.messagePhoto({
    source: {
      values: {
        value: path.resolve(
          __dirname,
          'assets',
          'prices.jpg'
        ),
      },
    },
  })

  await context.send({
    message: MESSAGES.INSTRUCTION.FOUR,
    attachment: priceImg.toString(),
    keyboard: secondKeyboard,
  })
})

// ------------------------------------------------------------------------

hearManager.hear(REG_EXP.ABOUT_COURSE, async (context) => {
  await context.send({
    message: MESSAGES.ABOUT_COURSE,
    keyboard: secondKeyboard,
  })
})

hearManager.hear(REG_EXP.ACTUAL_COURSE, async (context) => {
  await context.send({
    message: MESSAGES.ACTUAL_COURSE,
    keyboard: courseMoneyKeyboard,
  })
})

hearManager.hear(REG_EXP.ORDER, async (context) => {
  await context.send({
    message: MESSAGES.PLACE_AN_ORDER,
  })
})

hearManager.hear(REG_EXP.FAQ, async (context) => {
  await context.sendPhotos({
    value: path.resolve(__dirname, 'assets', 'FAQ.jpg'),
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

// ----------------------------------------------------------

hearManager.onFallback(async (context) => {
  await context.send({
    message: MESSAGES.UNDEF_COMMAND,
    keyboard: mainKeyboard,
  })
})

vk.updates.start().catch(console.error)
