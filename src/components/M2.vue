<template>
  <div class="m2-component">
    <h5 class="mb-1">日本のマネーサプライM2</h5>
    <p class="text-muted small mb-3">単位: JPY Billion</p>

    <div class="mb-3 d-flex gap-2 align-items-center flex-wrap">
      <label for="startDate" class="mb-0">開始日:</label>
      <input
        type="date"
        id="startDate"
        class="form-control w-auto"
        v-model="startDate"
        @change="updateChart">

      <label for="endDate" class="mb-0 ms-2">終了日:</label>
      <input
        type="date"
        id="endDate"
        class="form-control w-auto"
        v-model="endDate"
        @change="updateChart">
    </div>

    <div class="iframe-container">
      <iframe
        :src="chartUrl"
        height="300"
        width="600"
        frameborder="0"
        scrolling="no"
        :key="chartUrl">
      </iframe>
    </div>
    <div class="mt-2">
      source: <a href="https://jp.tradingeconomics.com/japan/money-supply-m2" target="_blank" rel="noopener noreferrer">tradingeconomics.com</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'M2',
  data() {
    const today = new Date()
    const tenYearsAgo = new Date()
    tenYearsAgo.setFullYear(today.getFullYear() - 10)

    return {
      startDate: tenYearsAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    }
  },
  computed: {
    chartUrl() {
      return `https://tradingeconomics.com/embed/?s=japanmonsupm2&v=202509111345V20230410&lang=all&h=300&w=600&ref=/japan/money-supply-m2&type=spline&d1=${this.startDate}&d2=${this.endDate}`
    }
  },
  methods: {
    updateChart() {
      // chartUrl computed property will automatically update
    }
  }
}
</script>

<style scoped>
.m2-component {
  padding: 1rem 0;
}

.iframe-container {
  overflow-x: auto;
  overflow-y: hidden;
}

.iframe-container iframe {
  display: block;
}
</style>
