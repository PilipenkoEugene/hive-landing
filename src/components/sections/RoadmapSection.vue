<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
useScrollAnimation()

const icons = [
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="20" height="20" rx="3"/><rect x="20" y="20" width="8" height="8" rx="1"/><line x1="20" y1="14" x2="20" y2="8"/><line x1="28" y1="14" x2="28" y2="8"/><line x1="20" y1="40" x2="20" y2="34"/><line x1="28" y1="40" x2="28" y2="34"/><line x1="14" y1="20" x2="8" y2="20"/><line x1="14" y1="28" x2="8" y2="28"/><line x1="40" y1="20" x2="34" y2="20"/><line x1="40" y1="28" x2="34" y2="28"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 42V14l12-8 12 8v28"/><line x1="8" y1="42" x2="40" y2="42"/><circle cx="24" cy="20" r="2.5"/><circle cx="24" cy="30" r="2.5"/><path d="M24 22.5v5"/><path d="M24 32.5V38"/><path d="M24 12v5.5"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="12" width="24" height="16" rx="3"/><path d="M30 18l12-6v24l-12-6"/><circle cx="16" cy="20" r="4"/></svg>`
]
</script>

<template>
  <section id="roadmap" class="roadmap">
    <div class="roadmap__container">
      <span class="roadmap__eyebrow">{{ t('roadmap.eyebrow') }}</span>
      <h2 class="roadmap__title">{{ t('roadmap.title') }}</h2>

      <div class="roadmap__grid">
        <div
          v-for="(_, index) in (tm('roadmap.items') as any[])"
          :key="index"
          class="roadmap__item animate-on-scroll"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="roadmap__icon" v-html="icons[index]" />
          <h3 class="roadmap__name">{{ t(`roadmap.items[${index}].title`) }}</h3>
          <ul class="roadmap__points">
            <li
              v-for="(__, pi) in (tm(`roadmap.items[${index}].points`) as any[])"
              :key="pi"
              class="roadmap__point"
            >
              {{ t(`roadmap.items[${index}].points[${pi}]`) }}
            </li>
          </ul>
        </div>
      </div>

      <p class="roadmap__outro">{{ t('roadmap.outro') }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.roadmap {
  background: $color-dark;
  padding: 64px 0 48px;
  position: relative;
  z-index: 1;

  @include mobile {
    padding: 40px 0 32px;
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
    margin-bottom: 48px;

    @include mobile {
      margin-bottom: 28px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
    max-width: 1040px;
    margin: 0 auto;

    @include tablet {
      gap: 32px;
    }

    @include mobile {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  &__item {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @include mobile {
      padding: 22px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &__icon {
    width: 34px;
    height: 34px;
    color: $color-primary;
    margin-bottom: 18px;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }

    @include mobile {
      margin-bottom: 12px;
    }
  }

  &__name {
    font-family: $font-display;
    font-size: 19px;
    font-weight: 800;
    color: $color-light;
    margin-bottom: 14px;

    @include mobile {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  &__points {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__point {
    position: relative;
    padding-left: 16px;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(252, 252, 251, 0.55);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $color-primary;
    }
  }

  &__outro {
    max-width: 1040px;
    margin: 44px auto 0;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.09);
    font-size: 15px;
    font-style: italic;
    font-weight: 600;
    color: $color-primary;
    text-align: center;

    @include mobile {
      margin-top: 24px;
      font-size: 13.5px;
    }
  }
}
</style>
