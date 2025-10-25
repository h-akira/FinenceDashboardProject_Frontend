<template>
  <div class="container-fluid mt-4">
    <div class="row mb-3">
      <div class="col-12">
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <div class="d-flex gap-3">
            <div class="form-check" v-for="chart in availableCharts" :key="chart.id">
              <input
                class="form-check-input"
                type="checkbox"
                :id="chart.id"
                v-model="chart.visible">
              <label class="form-check-label" :for="chart.id">
                {{ chart.label }}
              </label>
            </div>
          </div>
          <div class="d-none d-lg-flex align-items-center gap-2">
            <label for="columnsSelect" class="mb-0">横配置数:</label>
            <select
              id="columnsSelect"
              class="form-select w-auto"
              v-model="columnsPerRow">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="chart in visibleCharts"
        :key="chart.id"
        :class="columnClass">
        <component :is="chart.component" />
      </div>
    </div>
  </div>
</template>

<script>
import Exchange from './Exchange.vue'
import JP225 from './JP225.vue'
import Calendar from './Calendar.vue'
import MarketSummary from './MarketSummary.vue'
import M2 from './M2.vue'

export default {
  name: 'Home',
  components: {
    Exchange,
    JP225,
    Calendar,
    MarketSummary,
    M2
  },
  data() {
    return {
      columnsPerRow: '2',
      availableCharts: [
        { id: 'market-summary', label: 'MarketSummary', component: 'MarketSummary', visible: true },
        { id: 'calendar', label: 'Calendar', component: 'Calendar', visible: true },
        { id: 'exchange', label: 'Exchange', component: 'Exchange', visible: true },
        { id: 'jp225', label: 'JP225', component: 'JP225', visible: true },
        { id: 'm2', label: 'M2', component: 'M2', visible: true }
      ]
    }
  },
  computed: {
    visibleCharts() {
      return this.availableCharts.filter(chart => chart.visible)
    },
    columnClass() {
      const colMap = {
        '1': 'col-12',
        '2': 'col-12 col-lg-6',
        '3': 'col-12 col-lg-4'
      }
      return colMap[this.columnsPerRow]
    }
  }
}
</script>
