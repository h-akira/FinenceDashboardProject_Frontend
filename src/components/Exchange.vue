<template>
  <div class="usdjpy-component">
    <div class="mb-3 d-flex gap-2">
      <select
        id="currencyPairSelect"
        class="form-select w-auto"
        v-model="selectedPair"
        @change="updateWidget">
        <option value="OANDA:USDJPY">USDJPY</option>
        <option value="OANDA:EURJPY">EURJPY</option>
        <option value="OANDA:EURUSD">EURUSD</option>
        <option value="OANDA:GBPJPY">GBPJPY</option>
        <option value="OANDA:GBPUSD">GBPUSD</option>
        <option value="OANDA:AUDJPY">AUDJPY</option>
        <option value="OANDA:AUDUSD">AUDUSD</option>
        <option value="CAPITALCOM:DXY">DXY</option>
      </select>

      <select
        id="indicatorSelect"
        class="form-select w-auto"
        v-model="selectedIndicator"
        @change="updateWidget">
        <option value="Ichimoku">一目均衡表</option>
        <option value="Bollinger_SMA">BB+SMA</option>
      </select>
    </div>

    <div class="tradingview-widget-container">
      <div id="tradingview_usdjpy"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://jp.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span class="blue-text">TradingViewですべてのマーケットを追跡</span>
        </a>
      </div>
    </div>

    <div
      id="resizer"
      class="resizer"
      @mousedown="startResize">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const selectedPair = ref('OANDA:USDJPY')
const selectedIndicator = ref('Ichimoku')
const currentHeight = ref(700)
let widget = null
let isResizing = false

const getStudiesArray = (indicator) => {
  if (indicator === 'Ichimoku') {
    return ['STD;Ichimoku%1Cloud']
  } else if (indicator === 'Bollinger_SMA') {
    return ['STD;Bollinger_Bands', 'STD;SMA']
  }
  return []
}

const createWidget = () => {
  const studiesArray = getStudiesArray(selectedIndicator.value)

  if (widget) {
    widget.remove()
  }

  widget = new TradingView.widget({
    width: '100%',
    height: currentHeight.value,
    symbol: selectedPair.value,
    interval: 'D',
    timezone: 'Asia/Tokyo',
    theme: 'light',
    style: '1',
    locale: 'ja',
    details: true,
    enable_publishing: false,
    allow_symbol_change: true,
    studies: studiesArray,
    container_id: 'tradingview_usdjpy'
  })
}

const loadTradingViewScript = () => {
  if (window.TradingView) {
    createWidget()
    return
  }

  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/tv.js'
  script.async = true
  script.onload = () => {
    createWidget()
  }
  document.head.appendChild(script)
}

const updateWidget = () => {
  createWidget()
}

const resize = (event) => {
  if (!isResizing) return

  const container = document.querySelector('.tradingview-widget-container')
  const rect = container.getBoundingClientRect()
  const newHeight = event.clientY - rect.top

  if (newHeight > 300 && newHeight < 1200) {
    currentHeight.value = newHeight
    updateWidget()
  }
}

const stopResize = () => {
  isResizing = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

const startResize = () => {
  isResizing = true
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

onMounted(() => {
  loadTradingViewScript()
})

onBeforeUnmount(() => {
  if (widget) {
    widget.remove()
  }
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<style scoped>
.resizer {
  height: 10px;
  background: #ccc;
  cursor: ns-resize;
  margin: 10px 0;
}

.resizer:hover {
  background: #999;
}
</style>
