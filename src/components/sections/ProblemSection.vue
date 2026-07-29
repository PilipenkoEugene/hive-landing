<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
useScrollAnimation()

const icons = [
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M36 12L12 36M12 12l24 24"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h32M8 24h20M8 36h26"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18"/><path d="M24 16v10M24 32h.02"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 36l10-12 8 6 14-18"/><path d="M8 42h32"/></svg>`
]
</script>

<template>
  <section id="problem" class="problem">
    <div class="problem__container">
      <span class="problem__eyebrow">{{ t('problem.eyebrow') }}</span>
      <h2 class="problem__title">{{ t('problem.title') }}</h2>
      <p class="problem__lede">{{ t('problem.lede') }}</p>
      <div class="problem__grid">
        <div
          v-for="(icon, index) in icons"
          :key="index"
          class="problem__item animate-on-scroll"
          :style="{ transitionDelay: `${index * 70}ms` }"
        >
          <div class="problem__icon" v-html="icon" />
          <h3 class="problem__name">{{ t(`problem.items[${index}].title`) }}</h3>
          <p class="problem__desc">{{ t(`problem.items[${index}].description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.problem {
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
  }

  &__lede {
    text-align: center;
    font-size: 17px;
    line-height: 1.6;
    color: $color-gray;
    max-width: 640px;
    margin: 0 auto 44px;

    @include mobile {
      font-size: 14.5px;
      margin-bottom: 28px;
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
    padding: 28px 24px 32px;
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

  &__icon {
    width: 28px;
    height: 28px;
    color: $color-primary-active;
    margin-bottom: 16px;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &__name {
    font-family: $font-display;
    font-size: 16px;
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
