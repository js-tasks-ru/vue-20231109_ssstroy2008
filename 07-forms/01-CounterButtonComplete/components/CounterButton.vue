<template>
  <button @click="localCount++" >{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    }
  },

  data() {
    return {
      localCount: this.count
    }
  },

  watch: {
    count(newValue) {
      if (this.localCount !== newValue) {
        this.localCount = newValue;
      }
    },
    localCount(newValue) {
      this.$emit('update:count', newValue);
    }
  },

  emits: ['update:count']
};
</script>
