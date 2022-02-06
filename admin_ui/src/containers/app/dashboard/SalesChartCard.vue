<template>
  <b-card :title="$t('dashboards.sales')">
    <div class="dashboard-line-chart">
      <line-chart v-if="lineChartData" :data="lineChartData" shadow />
    </div>
  </b-card>
</template>
<script>
import LineChart from "../../../components/Charts/Line";
// import { lineChartData } from "../../../data/charts";
import { ThemeColors } from '../../../utils'
const colors = ThemeColors()


export default {
  components: {
    "line-chart": LineChart
  },
  data() {
    return {
      lineChartData: null,
    }
  },
  computed: {
    chartLabel() {
      return this.$store.state.dashboard.chartLabel;
    },
    chartData() {
      return this.$store.state.dashboard.chartData;
    }
  },
  // mounted() {
  //   this.fillData()
  // },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    // fillData() {
    //   this.lineChartData = {
    //     labels: this.chartLabel,
    //     datasets: [
    //       {
    //         label: "",
    //         data: this.chartData,
    //         borderColor: colors.themeColor1,
    //         pointBackgroundColor: colors.foregroundColor,
    //         pointBorderColor: colors.themeColor1,
    //         pointHoverBackgroundColor: colors.themeColor1,
    //         pointHoverBorderColor: colors.foregroundColor,
    //         pointRadius: 6,
    //         pointBorderWidth: 2,
    //         pointHoverRadius: 8,
    //         fill: false
    //       }
    //     ]
    //   }
    // }
  },
  async created() {
    await this.$store.dispatch("getChartData");
    this.lineChartData = {
        labels: this.chartLabel,
        datasets: [
          {
            label: "",
            data: this.chartData,
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false
          }
        ]
      }
  }
};
</script>
