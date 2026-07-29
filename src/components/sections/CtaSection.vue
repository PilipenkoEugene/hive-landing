<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
useScrollAnimation()
</script>

<template>
  <section id="cta" class="cta">
    <div class="cta__container">
      <div class="cta__inner animate-on-scroll">
        <div class="cta__line"></div>
        <h2 class="cta__title">{{ t('cta.title') }}</h2>
        <p class="cta__text">{{ t('cta.text') }}</p>
        <div class="cta__steps">
          <div
            v-for="(_, index) in (tm('cta.steps') as any[])"
            :key="index"
            class="cta__step"
          >
            <div class="cta__step-num">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="cta__step-title">{{ t(`cta.steps[${index}].title`) }}</h3>
            <p class="cta__step-text">{{ t(`cta.steps[${index}].text`) }}</p>
          </div>
        </div>
        <div class="cta__actions">
          <BaseButton tag="a" href="https://t.me/dmitry_chulkov" target="_blank" rel="noopener">
            {{ t('cta.button') }}
          </BaseButton>
          <a
            class="cta__secondary"
            href="https://vk.ru/dmitry_chulkov_dev"
            target="_blank"
            rel="noopener"
          >
            {{ t('cta.buttonVk') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta {
  padding: 24px 0 64px;
  background: $color-dark;
  position: relative;
  z-index: 1;

  @include mobile {
    padding: 16px 0 44px;
  }

  &__container {
    @include container;
  }

  &__inner {
    text-align: center;
    padding: 40px 0 16px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @include mobile {
      padding: 24px 0 8px;
    }
  }

  &__line {
    width: 56px;
    height: 3px;
    background: $color-primary;
    border-radius: 2px;
    margin: 0 auto 28px;

    @include mobile {
      margin-bottom: 20px;
    }
  }

  &__title {
    font-family: $font-display;
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -0.015em;
    color: $color-light;
    margin-bottom: 16px;

    @include mobile {
      font-size: 23px;
    }
  }

  &__text {
    font-size: 17px;
    line-height: 1.6;
    color: rgba(252, 252, 251, 0.65);
    max-width: 560px;
    margin: 0 auto 40px;
    position: relative;

    @include mobile {
      font-size: 15px;
      margin-bottom: 28px;
    }
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    max-width: 860px;
    margin: 0 auto 40px;
    text-align: left;

    @include mobile {
      grid-template-columns: 1fr;
      gap: 18px;
      margin-bottom: 28px;
    }
  }

  &__step {
    padding-top: 18px;
    border-top: 2px solid $color-primary;
  }

  &__step-num {
    font-family: $font-display;
    font-size: 13px;
    font-weight: 700;
    color: $color-primary;
    margin-bottom: 10px;
  }

  &__step-title {
    font-family: $font-display;
    font-size: 17px;
    font-weight: 800;
    color: $color-light;
    margin-bottom: 6px;
  }

  &__step-text {
    font-size: 13.5px;
    line-height: 1.55;
    color: rgba(252, 252, 251, 0.55);
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
      max-width: 360px;
      margin: 0 auto;
      gap: 12px;

      :deep(.base-button) {
        width: 100%;
      }
    }
  }

  &__secondary {
    @include mobile {
      width: 100%;
    }
  }

  &__secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 32px;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: $border-radius-sm;
    color: $color-light;
    font-size: $font-size-body;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-light;
      background: rgba(255, 255, 255, 0.06);
    }
  }
}
</style>
