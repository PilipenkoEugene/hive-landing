<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <div class="strip">
    <div class="strip__container">
      <div
        v-for="(_, index) in (tm('strip.items') as any[])"
        :key="index"
        class="strip__cell"
      >
        <div class="strip__k">{{ t(`strip.items[${index}].k`) }}</div>
        <div class="strip__v">{{ t(`strip.items[${index}].v`) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.strip {
  border-top: 1px solid $color-gray-light;
  border-bottom: 1px solid $color-gray-light;
  background: $color-light;
  position: relative;
  z-index: 1;

  &__container {
    @include container;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @include mobile {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__cell {
    padding: 24px 24px 24px 0;
    border-right: 1px solid $color-gray-light;

    &:not(:first-child) {
      padding-left: 24px;
    }

    &:last-child {
      border-right: 0;
    }

    @include mobile {
      padding: 16px 12px 16px 0;

      &:nth-child(odd) {
        padding-left: 0;
      }

      &:nth-child(even) {
        padding-left: 16px;
        border-right: 0;
      }

      &:nth-child(-n + 2) {
        border-bottom: 1px solid $color-gray-light;
      }
    }
  }

  &__k {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $color-gray;
    margin-bottom: 8px;
  }

  &__v {
    font-family: $font-display;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.35;
    color: $color-dark;

    @include mobile {
      font-size: 13px;
    }
  }
}
</style>
