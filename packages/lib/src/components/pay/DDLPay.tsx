import { Button, Image, NextUIProvider } from '@nextui-org/react'
import classes from './DDLPay.module.scss'
import { useLanguageT } from '../../useLanguageT'
import { SupportLangs } from '../../types/SupportLangs'
import { dreamlandLogo, payWithStripe, priceBg } from './images'
import { useEffect, useState } from 'react'
import { http } from '../../utils/http'
import { useLanguageManager } from '../../useLanguageManager'

export type DDLPayProps = Readonly<{
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onPaymentComplete?: () => void
  lang?: SupportLangs
}>

type Price = {
  package_id: string
  price: number
  ori_price: number
  product_num: number
}

function DDLPay({ isOpen, onOpenChange, onPaymentComplete, lang }: DDLPayProps) {
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

  const [currentSelectPkgId, setCurrentSelectPkgId] = useState('')
  const [payBtnLoading, setPayBtnLoading] = useState(false)
  const [waitingCallback, setWaitingCallback] = useState(false)

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
        show: true,
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

  setInterval(function () {
    calcOnSaleState()
  }, 60 * 1000)

  async function refreshPrices() {
    setPrices([])

    const res = await http({
      url: `/api/v1/finance/sales`,
      init: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    }[]

    setPrices(list)
  }

  async function onPayClicked() {
    if (!currentSelectPkgId) {
      return
    }

    setPayBtnLoading(true)

    const res = await http({
      url: `/api/v1/finance/create`,
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

  async function onPayCompleteClicked() {
    onPaymentComplete && onPaymentComplete()
    onOpenChange(!isOpen)
  }

  useEffect(function () {
    calcOnSaleState()
    ;(async function () {
      await refreshPrices()
    })()
  }, [])

  useEffect(
    function () {
      if (!isOpen) {
        setCurrentSelectPkgId('')
        setPayBtnLoading(false)
        setWaitingCallback(false)
      } else {
        refreshPrices()
      }
    },
    [isOpen]
  )

  return (
    <NextUIProvider>
      {isOpen && (
        <div
          onClick={() => {
            onOpenChange(!isOpen)
          }}
          className="fixed z-50 inset-0 flex justify-center items-center bg-slate-500/60"
        >
          {!waitingCallback && (
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className={`${classes.pay} w-[1180px] h-[613px] bg-[#000000] rounded-[24px] border-[#333333] border-1 flex flex-col`}
            >
              <div
                className={`${classes.title} h-[30px] mt-[42px] flex flex-row justify-center items-center`}
              >
                <span>{tPurchase}</span>
                <Image
                  className="mx-[12px]"
                  disableSkeleton={true}
                  width={90}
                  height={30}
                  src={dreamlandLogo}
                  alt="logo"
                />
                <span>{tDreamTokens}</span>
              </div>

              {onSaleState.show && (
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
                })}
              </div>

              <div className="flex flex-row justify-center items-center mt-[90px]">
                <Button
                  onClick={onPayClicked}
                  isDisabled={!currentSelectPkgId}
                  isLoading={payBtnLoading}
                  className={`w-[313px] h-[62px] rounded-[16px] cursor-pointer`}
                  style={{
                    backgroundImage: `url(${payWithStripe})`,
                  }}
                ></Button>
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
    </NextUIProvider>
  )
}

export { DDLPay }
