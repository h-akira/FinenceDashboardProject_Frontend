<template>
  <div class="market-summary-component">
    <div class="tradingview-widget-container" ref="container">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://jp.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span class="blue-text">TradingViewですべてのマーケットを追跡</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketSummary',
  mounted() {
    this.loadWidget()
  },
  methods: {
    loadWidget() {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js'
      script.async = true
      script.type = 'text/javascript'
      script.innerHTML = JSON.stringify({
        width: '100%',
        height: '600',
        symbolsGroups: [
          {
            name: '指数',
            originalName: 'Indices',
            symbols: [
              { name: 'FOREXCOM:SPXUSD', displayName: 'S&P 500' },
              { name: 'FOREXCOM:NSXUSD', displayName: 'US 100' },
              { name: 'FOREXCOM:DJI', displayName: 'Dow 30' },
              { name: 'INDEX:NKY', displayName: 'Nikkei 225' },
              { name: 'INDEX:DEU40', displayName: 'DAX Index' },
              { name: 'FOREXCOM:UKXGBP', displayName: 'UK 100' }
            ]
          },
          {
            name: '先物',
            originalName: 'Futures',
            symbols: [
              { name: 'COMEX:GC1!', displayName: 'Gold' },
              { name: 'NYMEX:CL1!', displayName: 'Oil' },
              { name: 'NYMEX:NG1!', displayName: 'Gas' },
              { name: 'CBOT:ZC1!', displayName: 'Corn' },
              { name: 'TVC:US10Y', displayName: 'US10Y' }
            ]
          },
          {
            name: 'FX',
            originalName: 'Forex',
            symbols: [
              { name: 'OANDA:USDJPY', displayName: 'USD/JPY' },
              { name: 'OANDA:EURJPY', displayName: 'EUR/JPY' },
              { name: 'OANDA:EURUSD', displayName: 'EUR/USD' },
              { name: 'OANDA:GBPJPY', displayName: 'GBP/JPY' },
              { name: 'OANDA:AUDJPY', displayName: 'AUD/JPY' },
              { name: 'OANDA:GBPUSD', displayName: 'GBP/USD' },
              { name: 'OANDA:AUDUSD', displayName: 'AUD/USD' }
            ]
          }
        ],
        showSymbolLogo: true,
        colorTheme: 'light',
        isTransparent: false,
        locale: 'ja'
      })

      this.$refs.container.appendChild(script)
    }
  },
  beforeUnmount() {
    if (this.$refs.container) {
      const scripts = this.$refs.container.querySelectorAll('script')
      scripts.forEach(script => script.remove())
    }
  }
}
</script>

<style scoped>
.tradingview-widget-container {
  height: 600px;
}
</style>
