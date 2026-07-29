<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
useScrollAnimation()
</script>

<template>
  <section id="compare" class="compare">
    <div class="compare__container">
      <span class="compare__eyebrow">{{ t('compare.eyebrow') }}</span>
      <h2 class="compare__title">{{ t('compare.title') }}</h2>
      <div class="compare__grid animate-on-scroll">
        <div class="compare__col">
          <h3 class="compare__col-title">{{ t('compare.ownTitle') }}</h3>
          <ul class="compare__list">
            <li
              v-for="(_, index) in (tm('compare.own') as any[])"
              :key="index"
              class="compare__row"
            >
              <span class="compare__sign">—</span>
              {{ t(`compare.own[${index}]`) }}
            </li>
          </ul>
        </div>
        <div class="compare__col compare__col--hive">
          <h3 class="compare__col-title">
            <svg class="compare__mark" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M56,7 L84,23 Q90,27 90,34 L90,66 Q90,73 84,77 L56,93 Q50,96 44,93 L16,77 Q10,73 10,66 L10,34 Q10,27 16,23 L44,7 Q50,4 56,7 Z" />
            </svg>
            {{ t('compare.hiveTitle') }}
          </h3>
          <ul class="compare__list">
            <li
              v-for="(_, index) in (tm('compare.hive') as any[])"
              :key="index"
              class="compare__row"
            >
              <span class="compare__sign compare__sign--plus">+</span>
              {{ t(`compare.hive[${index}]`) }}
            </li>
          </ul>
        </div>
      </div>
      <p class="compare__note">{{ t('compare.note') }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.compare {
  background: $color-dark;
  padding: 64px 0 56px;
  position: relative;
  z-index: 1;

  @include mobile {
    padding: 40px 0 36px;
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
    margin-bottom: 44px;

    @include mobile {
      margin-bottom: 24px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 1040px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @include mobile {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  &__col {
    border: 1px solid rgba(255, 255, 255, 0.14);
    padding: 32px 28px;

    &--hive {
      border-color: $color-primary;
    }

    @include mobile {
      padding: 22px 18px;
    }
  }

  &__col-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-display;
    font-size: 19px;
    font-weight: 800;
    color: $color-light;
    margin-bottom: 18px;

    @include mobile {
      font-size: 16px;
    }
  }

  &__mark {
    width: 22px;
    height: 22px;
    fill: $color-primary;
    flex-shrink: 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    gap: 13px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    font-size: 14.5px;
    line-height: 1.5;
    color: rgba(252, 252, 251, 0.65);

    &:last-child {
      border-bottom: none;
    }

    @include mobile {
      font-size: 13px;
      padding: 10px 0;
    }
  }

  &__sign {
    flex-shrink: 0;
    width: 14px;
    color: $color-gray;

    &--plus {
      color: $color-primary;
    }
  }

  &__note {
    max-width: 1040px;
    margin: 30px auto 0;
    font-family: $font-display;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: $color-light;
    text-align: center;

    @include mobile {
      font-size: 16px;
      margin-top: 20px;
    }
  }
}
</style>
