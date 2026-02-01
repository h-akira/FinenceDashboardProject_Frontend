<template>
  <div class="calendar-component">
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

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)

const loadWidget = () => {
  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
  script.async = true
  script.type = 'text/javascript'
  script.innerHTML = JSON.stringify({
    width: '100%',
    height: '600',
    colorTheme: 'light',
    isTransparent: false,
    locale: 'ja',
    importanceFilter: '0,1',
    currencyFilter: 'AUD,USD,CAD,EUR,FRF,DEM,JPY,MXN,CHF,TRL,GBP'
  })

  container.value.appendChild(script)
}

onMounted(() => {
  loadWidget()
})

onBeforeUnmount(() => {
  // Clean up script if needed
  if (container.value) {
    const scripts = container.value.querySelectorAll('script')
    scripts.forEach(script => script.remove())
  }
})
</script>

<style scoped>
.tradingview-widget-container {
  height: 600px;
}
</style>
