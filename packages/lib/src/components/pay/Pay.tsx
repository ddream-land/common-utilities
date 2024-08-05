//@ts-nocheck
import { Button, Image } from '@nextui-org/react'
import classes from './Pay.module.scss'
import { useLanguageT } from '../../useLanguageT'
import {
  payWithStripe,
  priceBg,
  powerLogo,
  powerBg,
  powerExtra,
  powerPriceLogo,
  betaNoteBg,
} from './images'
import { useEffect, useState } from 'react'
import { http } from '../../utils/http'
import { useLanguageManager } from '../../useLanguageManager'
import { DDLMiniIcon2 } from '../sidebar/DDLIcon'
import { BalanceType } from '../../utils/BalanceType'
import { useAmDispatch } from '../alter-message/AlterMessageContextProvider'
import { DDLPayProps } from './DDLPay'

type Price = {
  package_id: string
  price: number
  ori_price: number
  product_num: number
  free: number
}

function Pay({
  isOpen,
  onOpenChange,
  onPaymentComplete,
  lang,
  balanceType,
  onNotHaveEnoughDDreamToken,
}: DDLPayProps) {
  const {} = useLanguageManager(lang)

  const { translation: tPurchase } = useLanguageT('purchase')
  const { translation: tDreamToken } = useLanguageT('dreamToken')
  const { translation: tDreamTokens } = useLanguageT('dreamTokens')

  const { translation: tOnSaleEndDesc } = useLanguageT('limitedTimeOnSaleEndIn')
  const { translation: tDays } = useLanguageT('days')
  const { translation: tHours } = useLanguageT('hours')
  const { translation: tMins } = useLanguageT('mins')

  const { translation: tPayment } = useLanguageT('payment')
  const { translation: tPaymentDesc } = useLanguageT('paymentDesc')
  const { translation: tPaymentCompleted } = useLanguageT('paymentCompleted')

  const { translation: tAfterExchangePower } = useLanguageT('afterExchangePower')
  const { translation: tExtra } = useLanguageT('extra')
  const { translation: tExchange } = useLanguageT('exchange')
  const { translation: tInsufficientBalance } = useLanguageT('insufficientBalance')
  const { translation: tExchangeSuccess } = useLanguageT('exchangeSuccess')
  const { translation: tExchangeNote } = useLanguageT('exchangeNote')

  const [currentSelectPkgId, setCurrentSelectPkgId] = useState('')
  const [payBtnLoading, setPayBtnLoading] = useState(false)
  const [waitingCallback, setWaitingCallback] = useState(false)
  const amDispatch = useAmDispatch()

  const [prices, setPrices] = useState<Price[]>([])
  const [config, setConfig] = useState({
    currency: 'usd',
    unit_amount: 100,
  })

  const [onSaleState, setOnSaleState] = useState({
    show: false,
    days: 0,
    hours: 0,
    mins: 0,
  })
  const onSaleEnd = new Date('2024-07-31T00:00:00.000Z')
  function calcOnSaleState() {
    const showOnSaleEnd = new Date() < onSaleEnd
    if (showOnSaleEnd) {
      const timeDiff = onSaleEnd.getTime() - new Date().getTime()
      const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24)
      const hours = Math.floor(timeDiff / 1000 / 60 / 60 - days * 24)
      const mins = Math.floor(timeDiff / 1000 / 60 - days * 24 * 60 - hours * 60)

      setOnSaleState({
        show: false,
        days: days,
        hours: hours,
        mins: mins,
      })
    } else {
      setOnSaleState({
        show: false,
        days: 0,
        hours: 0,
        mins: 0,
      })
    }
  }

  function calcPrice(price: number) {
    return (price / 100).toFixed(1)
  }

  async function refreshPrices(balanceType?: BalanceType) {
    setPrices([])

    const type = balanceType ?? BalanceType.DDreamToken

    const res = await http({
      url: `/ddream/api/v1/finance/sales`,
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: type,
        }),
      },
      mustLogin: true,
    })
    if (!res || !res.ok) {
      return
    }
    const resJson = await res.json()
    if (resJson.code !== 0) {
      return
    }

    const data = resJson.data
    const priceList = data.list
    if (!priceList || !Array.isArray(priceList)) {
      return
    }

    const list = priceList as {
      ori_price: number
      package_id: string
      price: number
      product_id: string
      product_num: number
      status: number
      stripe_price_id: string
      stripe_product_id: string
      free: number
    }[]

    setPrices(list)
    if (list.length > 0) {
      setCurrentSelectPkgId(list[0].package_id)
    }
  }

  async function onPayClicked() {
    if (!currentSelectPkgId) {
      return
    }

    setPayBtnLoading(true)

    const res = await http({
      url: `/ddream/api/v1/finance/create`,
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ package_id: currentSelectPkgId, pay_source: 'stripe' }),
      },
      mustLogin: true,
    })
    setPayBtnLoading(false)

    if (!res || !res.ok) {
      return
    }
    const resJson = await res.json()
    if (resJson.code !== 0) {
      return
    }

    const data = resJson.data
    if (!('url' in data)) {
      return
    }

    setWaitingCallback(true)

    const url = data.url
    window.open(url, 'blank')
  }

  async function onPowerExchangeClicked() {
    if (!currentSelectPkgId) {
      return
    }

    setPayBtnLoading(true)

    const res = await http({
      url: `/ddream/api/v1/finance/exchange`,
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ package_id: currentSelectPkgId }),
      },
      mustLogin: true,
    })

    setPayBtnLoading(false)

    if (!res || !res.ok) {
      return
    }
    const resJson = (await res.json()) as { code: number; msg?: string }
    if (resJson.code === 7003) {
      amDispatch({
        type: 'add',
        payload: {
          message: tInsufficientBalance,
          type: 'error',
        },
      })
      onNotHaveEnoughDDreamToken && onNotHaveEnoughDDreamToken()
      return
    }
    if (resJson.code !== 0) {
      amDispatch({
        type: 'add',
        payload: {
          message: resJson.msg ?? 'error',
          type: 'error',
        },
      })
      return
    }

    amDispatch({
      type: 'add',
      payload: {
        message: tExchangeSuccess,
        type: 'success',
      },
    })

    onPaymentComplete && onPaymentComplete()
    onOpenChange(!isOpen)
  }

  async function onPayCompleteClicked() {
    onPaymentComplete && onPaymentComplete()
    onOpenChange(!isOpen)
  }

  function powerIncrease() {
    const item = prices.find((x) => x.package_id === currentSelectPkgId)
    if (!item) {
      return `+0`
    }
    return `+${item.product_num + item.free}`
  }

  useEffect(
    function () {
      if (!isOpen) {
        setCurrentSelectPkgId('')
        setPayBtnLoading(false)
        setWaitingCallback(false)
      } else {
        refreshPrices(balanceType)
      }
    },
    [isOpen]
  )

  useEffect(function () {
    calcOnSaleState()

    const timer = setInterval(function () {
      calcOnSaleState()
    }, 60 * 1000)

    ;(async function () {
      await refreshPrices(balanceType)
    })()

    return function () {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            onOpenChange(!isOpen)
          }}
          className="fixed z-50 inset-0 flex justify-center items-center bg-slate-500/60"
        >
          {(!balanceType || balanceType === BalanceType.DDreamToken) && (
            <div
              className="w-[600px] h-[800px] bg-no-repeat bg-contain rounded-[24px] overflow-hidden"
              style={{
                backgroundImage: `url(${betaNoteBg})`,
              }}
            ></div>
          )}

          {!waitingCallback && balanceType === BalanceType.Power && (
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className={`${classes.pay} w-[1180px] h-[613px] bg-[#000000] rounded-[24px] border-[#333333] border-1 flex flex-col`}
            >
              <div
                className={`${classes.title} h-[30px] mt-[42px] flex flex-row justify-center items-center`}
              >
                {(!balanceType || balanceType === BalanceType.DDreamToken) && (
                  <>
                    <span>{tPurchase}</span>
                    {/* <Image
                  className="mx-[12px]"
                  disableSkeleton={true}
                  width={90}
                  height={30}
                  src={dreamlandLogo}
                  alt="logo"
                /> */}
                    <div className="mx-[12px]">
                      <DDLMiniIcon2></DDLMiniIcon2>
                    </div>

                    <span>{tDreamTokens}</span>
                  </>
                )}
                {balanceType === BalanceType.Power && (
                  <>
                    <div className="flex flex-row justify-center items-center text-[24px] font-[600]">
                      <Image src={powerLogo}></Image>
                      <span className="ml-3">{tAfterExchangePower}</span>
                      <span>{powerIncrease()}</span>
                    </div>
                  </>
                )}
              </div>

              {balanceType === BalanceType.Power && (
                <div className="w-full flex justify-center items-center">
                  <div className="text-[18px] font-[600] w-[50%] tracking-wide flex flex-row justify-center items-center mt-[20px] mb-[-30px] break-all text-center">
                    {tExchangeNote}
                  </div>
                </div>
              )}

              {onSaleState.show && (!balanceType || balanceType === BalanceType.DDreamToken) && (
                <div className="mt-[15px] flex flex-row justify-center items-center">
                  <span
                    className={`${classes.onSale} bg-[#111111] border-1 border-[#B9FF4C] text-[#B9FF4C] rounded-[30px] px-[22px] py-[10px] flex flex-row items-center`}
                  >
                    <span>{tOnSaleEndDesc}</span>
                    &nbsp;
                    <span className=" font-bold text-[14px]">{onSaleState.days}</span>
                    &nbsp;
                    <span>{tDays}</span>
                    &nbsp;
                    <span className=" font-bold text-[14px]">{onSaleState.hours}</span>
                    &nbsp;
                    <span>{tHours}</span>
                    &nbsp;
                    <span className=" font-bold text-[14px]">{onSaleState.mins}</span>
                    &nbsp;
                    <span>{tMins}</span>
                  </span>
                </div>
              )}

              <div
                className={`${
                  onSaleState.show ? 'mt-[52px]' : 'mt-[104px]'
                } flex flex-row justify-center items-center gap-[20px]`}
              >
                {prices.map(function (price, index) {
                  switch (balanceType) {
                    case BalanceType.Power: {
                      return (
                        <div
                          key={index}
                          onClick={(e) => {
                            setCurrentSelectPkgId(price.package_id)
                          }}
                          className={`${classes.pricePanel} ${
                            currentSelectPkgId === price.package_id ? classes.selected : ''
                          } cursor-pointer w-[180px] h-[240px] border-1 border-[#353535] rounded-[14px] flex flex-row justify-center items-center relative`}
                          style={{
                            backgroundImage: `url(${powerBg})`,
                          }}
                        >
                          <div className="w-[96px] h-[28px] absolute top-[-14px] left-0 bg-gradient-to-r from-[#B9FF4C] to-[#21FFF2] rounded-tl-[50px] rounded-r-[50px] text-[14px] font-[600] text-[#000] flex flex-row justify-center items-center">
                            <span>{tExtra}</span>
                            <Image src={powerExtra} className="ml-2"></Image>
                            <span>{price.free}</span>
                          </div>

                          <div className="mt-[160px] text-[42px] font-[700] text-[#EAECEF] flex flex-row justify-center items-center">
                            {`+${price.product_num}`}
                          </div>

                          <div className="h-[38px] absolute bottom-[-46px] left-0 right-0 text-[24px] font-[700] text-[#fff] flex flex-row justify-center items-center">
                            <Image src={powerPriceLogo}></Image>
                            <span className="ml-2">{price.price}</span>
                          </div>
                        </div>
                      )
                    }
                    default: {
                      return (
                        <div
                          key={index}
                          onClick={(e) => {
                            setCurrentSelectPkgId(price.package_id)
                          }}
                          className={`${classes.pricePanel} ${
                            currentSelectPkgId === price.package_id ? classes.selected : ''
                          } cursor-pointer w-[180px] h-[240px] border-1 border-[#353535] rounded-[14px] flex flex-row justify-center items-center relative`}
                          style={{
                            backgroundImage: `url(${priceBg})`,
                          }}
                        >
                          <div className="flex flex-row items-center justify-center">
                            <div className={`${classes.dol}`}>$</div>
                            <div className={`${classes.price} ml-1`}>{calcPrice(price.price)}</div>
                          </div>

                          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 h-[24px] w-full flex flex-row justify-center items-baseline">
                            <div className={`${classes.token}`}>{price.product_num}</div>
                            <div className={`${classes.tokenUnit} ml-1`}>{tDreamToken}</div>
                          </div>
                        </div>
                      )
                    }
                  }
                })}
              </div>

              <div className="flex flex-row justify-center items-center mt-[90px]">
                {(!balanceType || balanceType === BalanceType.DDreamToken) && (
                  <Button
                    onClick={onPayClicked}
                    isDisabled={!currentSelectPkgId}
                    isLoading={payBtnLoading}
                    className={`w-[313px] h-[62px] rounded-[16px] cursor-pointer`}
                    style={{
                      backgroundImage: `url(${payWithStripe})`,
                    }}
                  ></Button>
                )}
                {balanceType === BalanceType.Power && (
                  <Button
                    onClick={onPowerExchangeClicked}
                    isDisabled={!currentSelectPkgId}
                    isLoading={payBtnLoading}
                    className={`w-[313px] h-[62px] rounded-[16px] text-[24px] font-[600] text-[#000] cursor-pointer bg-gradient-to-r from-[#B9FF4C] to-[#21FFF2]`}
                  >
                    {tExchange}
                  </Button>
                )}
              </div>
            </div>
          )}

          {waitingCallback && (
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className={`${classes.payment} w-[558px] h-[300px] p-[34px] bg-[#121315] rounded-[12px] border-[#333333] border-1 flex flex-col`}
            >
              <div className={`${classes.title}`}>{tPayment}</div>
              <div className={`${classes.desc} mt-[80px] text-[#A0A0AA]`}>{tPaymentDesc}</div>
              <div className="mt-[50px] flex flex-row justify-end items-center">
                <Button
                  onClick={onPayCompleteClicked}
                  className={`${classes.btn} w-[228px] rounded-[12px] bg-[#18A9CC]`}
                >
                  {tPaymentCompleted}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export { Pay }
