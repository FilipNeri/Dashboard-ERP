<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props:{
      chartData:{
          type:Object
      },
      options:{
          type:Object,
      }
  },
  mounted() {
    const data = this.chartData
    const options = this.options
    this.renderChart(data, options);
  }
};
</script>