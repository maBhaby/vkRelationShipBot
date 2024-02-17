import { VK } from 'vk-io'
import { HearManager } from '@vk-io/hear'
import path from 'path'
import fs from 'fs/promises'

import jsonDB from './db/index.json'

import {
  mainKeyboard,
  secondKeyboard,
  courseMoneyKeyboard,
  calcKeyboard,
  recalculationKeyboard,
  adminKeyboard,
} from './utils/keyboards'

import { MESSAGES } from './messages'
import {
  REG_EXP,
  PRICE_CONTENT,
  ADMIN_ACTIONS,
  DB_KEYS_FOR_CHANGE,
} from './consts'
import { TCalculateCost, TAdminActions } from './types'
import { cloneDeep } from './utils/main'

const vk = new VK({
  token: process.env.VK_TOKEN,
})

// ! this so bad
const state: {
  current: TCalculateCost
  admin: TAdminActions | ''
} = {
  current: '',
  admin: '',
}

const hearManager = new HearManager()

vk.updates.on('message_new', hearManager.middleware)

hearManager.hear(REG_EXP.DELIVERY, async (context) => {
  await context.send({
    message: MESSAGES.DELIVERY({
      shoesDelivery: jsonDB.deliveryToPetersburgShoese,
      socksDelivery: jsonDB.deliveryToPetersburgSocks,
      outwearDelivery: jsonDB.deliveryToPetersburgOutwear,
      tshirtDelivery: jsonDB.deliveryToPetersburgTShirt,
    }),
    keyboard: secondKeyboard,
  })
})
// ------------------------------------------------------------------------

hearManager.hear(
  [REG_EXP.CALCULATE_COST, REG_EXP.OTHER_CATEGORY],
  async (ctx) => {
    await ctx.send({
      message: MESSAGES.CALCULATE_COST,
      keyboard: calcKeyboard,
    })
  }
)

hearManager.hear(
  [
    REG_EXP.SHOES,
    REG_EXP.SOCKS_UNDERPANTS,
    REG_EXP.OUTERWEAR,
    REG_EXP.TSHIRT_PANTS_SHORTS,
    REG_EXP.CALC_MORE,
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
    console.log('state.current', state.current)

    const yuanPrice = Number(context.text)
    const currentDelivery =
      jsonDB[PRICE_CONTENT[state.current].dbKey]

    const yuanToRub = +(
      yuanPrice * jsonDB.yuanRate
    ).toFixed(2)
    const priceProduct = currentDelivery + yuanToRub
    const priceProductWithCommission = Math.ceil(
      priceProduct * (1 + jsonDB.percentageCommission / 100)
    )

    console.log('yuanToRub', yuanToRub)
    console.log(
      'priceProduct',
      jsonDB[PRICE_CONTENT[state.current].dbKey] + yuanToRub
    )
    console.log(
      'priceProductWithCommission',
      (priceProduct * jsonDB.percentageCommission) / 100
    )

    await context.send({
      message: MESSAGES.TOTAL_PRICE({
        fullPrice: priceProductWithCommission,
        yuanCourse: jsonDB.yuanRate,
        yuanPrice,
        commission: jsonDB.percentageCommission,
        delivery: currentDelivery,
        category: PRICE_CONTENT[state.current].category,
      }),
      keyboard: recalculationKeyboard(state.current),
    })
  } else if (
    jsonDB.adminId.includes(context.senderId) &&
    state.admin !== ''
  ) {
    console.log(context.text, state.admin)
    const deepCloneDB = cloneDeep(jsonDB)
    deepCloneDB[DB_KEYS_FOR_CHANGE[state.admin]] = Number(
      context.text
    )

    try {
      await fs.writeFile(
        path.resolve(__dirname, 'db', 'index.json'),
        JSON.stringify(deepCloneDB)
      )
      console.log('УСПЕШНО')
      await context.send({ message: 'успешно' })
    } catch (error) {
      console.log('error', error)
      await context.send({ message: 'Ошибка' })
    }

    return
  } else {
    return next()
  }
})

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
    message: MESSAGES.ACTUAL_COURSE(jsonDB.yuanRate),
    keyboard: courseMoneyKeyboard,
  })
})

hearManager.hear(REG_EXP.ORDER, async (context) => {
  console.log('context', context);
  
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

// -------------------------for admin---------------------------------

hearManager.hear(REG_EXP.ADMIN_INIT, async (ctx, next) => {
  if (jsonDB.adminId.includes(ctx.senderId)) {
    await ctx.send({
      message: 'admin panel',
      keyboard: adminKeyboard,
    })
  } else {
    return next()
  }
})

hearManager.hear(
  REG_EXP.ADMIN_SHOW_ALL,
  async (ctx, next) => {
    if (ctx.messagePayload.action === 'showAllValue') {
      await ctx.send({
        message: MESSAGES.ADMIN_SHOW_ALL({
          yuanCourse: jsonDB.yuanRate,
          commission: jsonDB.percentageCommission,
          shoesDelivery: jsonDB.deliveryToPetersburgShoese,
          outwearDelivery:
            jsonDB.deliveryToPetersburgOutwear,
          tshirtDelivery: jsonDB.deliveryToPetersburgTShirt,
          socksDelivery: jsonDB.deliveryToPetersburgSocks,
        }),
        keyboard: adminKeyboard,
      })
    } else {
      return next()
    }
  }
)

hearManager.hear(
  [
    REG_EXP.ADMIN_CHANGE_YUANE,
    REG_EXP.ADMIN_CHANGE_COMMISSION,
    REG_EXP.ADMIN_CHANGE_SHOES,
    REG_EXP.ADMIN_CHANGE_OUTWEAR,
    REG_EXP.ADMIN_CHANGE_TSHIRT,
    REG_EXP.ADMIN_CHANGE_SOCKS,
  ],
  async (ctx, next) => {
    if (ADMIN_ACTIONS.includes(ctx.messagePayload.action)) {
      state.admin = ctx.messagePayload.action

      await ctx.send({
        message: MESSAGES.ADMIN_CHANGE_VALUE(ctx.messagePayload.label),
        keyboard: adminKeyboard,
      })
    } else {
      return next()
    }
  }
)

// ----------------------------------------------------------

hearManager.onFallback(async (context) => {
  await context.send({
    message: MESSAGES.UNDEF_COMMAND,
    keyboard: mainKeyboard,
  })
})

vk.updates.start().catch(console.error)
