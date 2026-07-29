<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
useScrollAnimation()
</script>

<template>
  <section id="geo" class="geo">
    <div class="geo__container">
      <span class="geo__eyebrow">{{ t('geo.eyebrow') }}</span>
      <h2 class="geo__title">{{ t('geo.title') }}</h2>
      <div class="geo__grid">
        <div
          v-for="(_, index) in (tm('geo.items') as any[])"
          :key="index"
          class="geo__item animate-on-scroll"
          :style="{ transitionDelay: `${index * 70}ms` }"
        >
          <span
            class="geo__status"
            :class="{ 'geo__status--live': index === 0 }"
          >
            {{ t(`geo.items[${index}].status`) }}
          </span>
          <h3 class="geo__name">{{ t(`geo.items[${index}].title`) }}</h3>
          <p class="geo__desc">{{ t(`geo.items[${index}].description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.geo {
  padding: 48px 0;
  position: relative;
  z-index: 1;
  background: $color-light;

  @include mobile {
    padding: 32px 0;
  }

  &__container {
    @include container;
  }

  &__eyebrow {
    @include section-eyebrow;
  }

  &__title {
    @include section-title;
    margin-bottom: 40px;

    @include mobile {
      margin-bottom: 24px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: $color-gray-light;
    border: 1px solid $color-gray-light;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    background: $color-light;
    padding: 26px 22px 30px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @include mobile {
      padding: 20px 18px 24px;
    }
  }

  &__status {
    display: inline-block;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 10px;
    margin-bottom: 16px;
    background: #f2f2f2;
    color: $color-gray;

    &--live {
      background: $color-primary;
      color: $color-dark;
    }
  }

  &__name {
    font-family: $font-display;
    font-size: 19px;
    font-weight: 800;
    color: $color-dark;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 13.5px;
    color: $color-gray;
    line-height: 1.55;
  }
}
</style>
