<template>
  <component 
      :is="tag" 
      class='button' 
      :class="componentClass"
      :type="buttonType"
    >
      <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'UiButton',

  props: { 
    tag: {
      required: false,
      default: 'button',
    },
    variant: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
    },
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    }
  },

  computed: {
    componentClass() {
      let currentClass = [];
      if (this.block) {
        currentClass.push('button_block');
      }
      switch(this.variant) {
        case 'primary':
          currentClass.push('button_primary');
          break;
        case 'secondary':
          currentClass.push('button_secondary');
          break;
        case 'danger':
          currentClass.push('button_danger');
          break;
      }
      return currentClass.join(' ');
    },

    buttonType() {
      return this.tag !== 'button' ? null : this.type;
    }
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
