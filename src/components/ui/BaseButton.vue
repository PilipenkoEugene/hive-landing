<script setup lang="ts">
defineProps<{
  tag?: string
  href?: string
}>()
</script>

<template>
  <component
    :is="tag || 'button'"
    :href="href"
    class="base-button"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 32px;
  background: $color-primary;
  // прозрачная рамка выравнивает высоту с обводными кнопками
  border: 1.5px solid transparent;
  color: $color-dark;
  font-size: $font-size-body;
  font-weight: 700;
  line-height: 1.5;
  border-radius: $border-radius-sm;
  transition: all 0.25s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: $color-primary-hover;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(243, 180, 65, 0.35);
  }

  &:active {
    background: $color-primary-active;
    transform: translateY(0);
    box-shadow: none;
  }
}
</style>
