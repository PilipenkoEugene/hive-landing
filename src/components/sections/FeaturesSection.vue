<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
useScrollAnimation()

const icons = [
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="16" height="32" rx="2"/><rect x="26" y="18" width="16" height="24" rx="2"/><line x1="12" y1="16" x2="16" y2="16"/><line x1="12" y1="22" x2="16" y2="22"/><line x1="12" y1="28" x2="16" y2="28"/><line x1="12" y1="34" x2="16" y2="34"/><line x1="32" y1="24" x2="36" y2="24"/><line x1="32" y1="30" x2="36" y2="30"/><line x1="32" y1="36" x2="36" y2="36"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h32v36l-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3V6z"/><line x1="16" y1="16" x2="32" y2="16"/><line x1="16" y1="22" x2="28" y2="22"/><line x1="16" y1="28" x2="24" y2="28"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10h24a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H16l-8 6V12a2 2 0 0 1 2-2z"/><path d="M18 28v2a2 2 0 0 0 2 2h12l8 6V20a2 2 0 0 0-2-2h-4"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8h4l4 20h20l4-14H16"/><circle cx="20" cy="36" r="3"/><circle cx="34" cy="36" r="3"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4L8 12v10c0 11 7 20 16 22 9-2 16-11 16-22V12L24 4z"/><polyline points="18 24 22 28 30 20"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4L8 12v10c0 11 7 20 16 22 9-2 16-11 16-22V12L24 4z"/><circle cx="24" cy="22" r="3"/><path d="M24 25v4"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="12" width="32" height="24" rx="3"/><circle cx="20" cy="24" r="5"/><line x1="30" y1="20" x2="36" y2="20"/><line x1="30" y1="25" x2="36" y2="25"/><line x1="30" y1="30" x2="34" y2="30"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="14" r="5"/><circle cx="34" cy="14" r="5"/><path d="M6 36v-4c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v4"/><path d="M30 24h4c4.4 0 8 3.6 8 8v4"/></svg>`
]
</script>

<template>
  <section id="features" class="features">
    <div class="features__container">
      <span class="features__eyebrow">{{ t('features.eyebrow') }}</span>
      <h2 class="features__title">{{ t('features.title') }}</h2>
      <div class="features__divider"></div>
      <div class="features__grid">
        <div
          v-for="(icon, index) in icons"
          :key="index"
          class="features__item animate-on-scroll"
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <div class="features__icon" v-html="icon" />
          <h3 class="features__name">{{ t(`features.items[${index}].title`) }}</h3>
          <p class="features__desc">{{ t(`features.items[${index}].description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.features {
  padding: 48px 0 40px;
  position: relative;
  z-index: 1;
  background: $color-light;

  @include mobile {
    padding: 32px 0 24px;
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

  &__divider {
    height: 1px;
    background: $color-gray-light;
    margin: 28px 0 44px;

    @include mobile {
      margin: 16px 0 8px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 40px;
    row-gap: 48px;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 40px;
    }

    @include mobile {
      grid-template-columns: 1fr;
      row-gap: 0;
    }
  }

  &__item {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @include mobile {
      display: grid;
      grid-template-columns: 40px 1fr;
      column-gap: 16px;
      row-gap: 2px;
      align-items: start;
      padding: 18px 0;
      border-bottom: 1px solid $color-gray-light;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &__icon {
    width: 30px;
    height: 30px;
    color: $color-dark;
    margin-bottom: 16px;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }

    @include mobile {
      grid-row: 1 / 3;
      width: 32px;
      height: 32px;
      margin-bottom: 0;
      margin-top: 3px;
    }
  }

  &__name {
    font-family: $font-display;
    font-size: 17px;
    font-weight: 800;
    color: $color-dark;
    margin-bottom: 8px;
    line-height: 1.3;

    @include mobile {
      font-size: 15px;
      margin-bottom: 3px;
    }
  }

  &__desc {
    font-size: 14px;
    color: $color-gray;
    line-height: 1.6;

    @include mobile {
      font-size: 13px;
    }
  }
}
</style>
