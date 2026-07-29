<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CountUp from '@/components/ui/CountUp.vue'

const { t, tm } = useI18n()
</script>

<template>
  <section class="stats">
    <div class="stats__container">
      <CountUp
        v-for="(_, index) in (tm('stats.items') as any[])"
        :key="index"
        :value="Number(t(`stats.items[${index}].value`))"
        :suffix="t(`stats.items[${index}].suffix`)"
        :label="t(`stats.items[${index}].label`)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats {
  padding: 40px 0;
  background: $color-dark;
  position: relative;
  z-index: 1;

  &__container {
    @include container;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;

    // Vertical dividers between items — only when all 4 sit in one row
    @media (min-width: #{$breakpoint-tablet}) {
      :deep(.count-up) {
        position: relative;

        &:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -16px;
          top: 10%;
          height: 80%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(243,180,65,0.25), transparent);
        }
      }
    }

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 24px;
    }

    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 16px;
    }
  }
}
</style>
