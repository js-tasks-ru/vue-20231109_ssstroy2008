import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  emits: ['update:count'],
  // Компонент должен иметь входной параметр и порождать событие
  methods: {
    buttonClick(value) {
      this.$emit('update:count', value + 1)
    }
  },
  template: `<button @click='buttonClick(count)' type="button">{{ count }}</button>`,
});
