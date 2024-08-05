const DDLUrl = {
  _baseUrl: 'https://service.ddream.land',

  get baseUrl() {
    return this._baseUrl
  },

  setBaseUrl(url: string) {
    this._baseUrl = url
  },

  getFullUrl(url: string, urlParams?: URLSearchParams) {
    return `${this._baseUrl}${url}` + (urlParams ? `?${urlParams.toString()}` : '')
  },
}

export default DDLUrl
