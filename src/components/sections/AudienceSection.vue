<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
useScrollAnimation()
</script>

<template>
  <section id="audience" class="audience">
    <div class="audience__container">
      <span class="audience__eyebrow">{{ t('audience.eyebrow') }}</span>
      <h2 class="audience__title">{{ t('audience.title') }}</h2>
      <div class="audience__list">
        <div
          v-for="(_, index) in (tm('audience.items') as any[])"
          :key="index"
          class="audience__row animate-on-scroll"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <span class="audience__num">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="audience__name">{{ t(`audience.items[${index}].title`) }}</h3>
          <p class="audience__desc">{{ t(`audience.items[${index}].description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.audience {
  background: $color-dark;
  padding: 72px 0;
  position: relative;
  z-index: 1;

  @include mobile {
    padding: 44px 0;
  }

  &__container {
    @include container;
  }

  &__eyebrow {
    @include section-eyebrow;
    color: $color-primary;
  }

  &__title {
    @include section-title;
    color: $color-light;
    margin-bottom: 40px;

    @include mobile {
      margin-bottom: 20px;
    }
  }

  &__list {
    max-width: 1040px;
    margin: 0 auto;
  }

  &__row {
    display: grid;
    grid-template-columns: 110px 1fr 1.15fr;
    align-items: center;
    column-gap: 32px;
    padding: 30px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    &:last-child {
      border-bottom: none;
    }

    @include mobile {
      grid-template-columns: 52px 1fr;
      column-gap: 16px;
      row-gap: 8px;
      padding: 22px 0;
    }
  }

  &__num {
    font-family: $font-display;
    font-size: 56px;
    font-weight: 300;
    line-height: 1;
    color: $color-primary;

    @include mobile {
      font-size: 32px;
    }
  }

  &__name {
    font-family: $font-display;
    font-size: 22px;
    font-weight: 800;
    color: $color-light;
    line-height: 1.3;

    @include mobile {
      font-size: 17px;
      align-self: center;
    }
  }

  &__desc {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(252, 252, 251, 0.55);

    @include mobile {
      grid-column: 1 / -1;
      font-size: 13.5px;
    }
  }
}
</style>
