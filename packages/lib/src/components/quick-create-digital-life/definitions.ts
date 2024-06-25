
type customerPersonalityDataType = {
  name: string,
  list: Array<{
    list: Array<{
      name: string,
      selected: boolean,
    }>
  }>
}

type personalityDataType = {
  name: string
  isCustomer: boolean
  list: Array<{
    name: string
    isCustomer: boolean
    list: Array<{
      name: string
      selected: boolean
    }>
  }>
}