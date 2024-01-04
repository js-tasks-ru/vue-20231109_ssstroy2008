<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    <SensorsDataRow v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
  </template>
</template>

<script>
//import { handleError, ref, watch } from 'vue';
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';

// const sensorsReactive = ref()

// watch(
//   sensorsReactive,
//   () => {
//     setInterval(() => {
//       sensorsDataController.getData();
//     }, 1000);
//   },
//   {
//     immediate: true,
//   }
// )

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: null,
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();
    }, 1000);
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  methods: {
    callback(data) {
      this.setData(data);
    },

    setData(sensors) {
      this.sensors = sensors;
    },
  },

  watch: {
    sensors: {
      immediate: true,
      handler(newVal) {
        setInterval(() => {
          this.sensors = newVal;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped></style>
