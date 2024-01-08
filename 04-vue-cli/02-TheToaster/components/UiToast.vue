<template>
  <span>{{ toast.message }}</span>
</template>

<script>
export default {
  name: 'UiToast',
  
  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
};
</script>
