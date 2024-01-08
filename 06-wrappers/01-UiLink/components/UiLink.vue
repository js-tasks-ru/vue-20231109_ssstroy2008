<template>
  <component :is="tag" class="link"><slot></slot></component>
</template>

<script>
export default {
  name: 'UiLink',

  props: { 
    tag: {
      required: false,
      default: 'RouterLink'
    } 
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
