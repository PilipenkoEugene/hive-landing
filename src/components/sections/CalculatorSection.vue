<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, locale } = useI18n()
useScrollAnimation()

const APT_MIN = 200
const APT_MAX = 20000
const BILL_MIN = 1000
const BILL_MAX = 15000

const apartments = ref(3000)
const avgBill = ref(5000)

// Вилка дополнительной собираемости ЖКУ: +5–15% (по данным внедрений)
const RATE_LOW = 0.05
const RATE_HIGH = 0.15

const loc = computed(() => (locale.value === 'en' ? 'en-US' : 'ru-RU'))

// Всегда полные суммы, округлённые до сотен — без переключения на «тыс.»
function formatAmount(value: number): string {
  const n = Math.round(value / 100) * 100
  return n.toLocaleString(loc.value, { maximumFractionDigits: 0 })
}

const lowM = computed(() => formatAmount(apartments.value * avgBill.value * RATE_LOW))
const highM = computed(() => formatAmount(apartments.value * avgBill.value * RATE_HIGH))

const aptFormatted = computed(() => apartments.value.toLocaleString(loc.value))
const billFormatted = computed(() => avgBill.value.toLocaleString(loc.value) + ' ₸')

const aptFill = computed(() => ((apartments.value - APT_MIN) / (APT_MAX - APT_MIN)) * 100 + '%')
const billFill = computed(() => ((avgBill.value - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100 + '%')
</script>

<template>
  <section id="calculator" class="calc">
    <div class="calc__container">
      <span class="calc__eyebrow">{{ t('calculator.eyebrow') }}</span>
      <h2 class="calc__title">{{ t('calculator.title') }}</h2>
      <div class="calc__divider"></div>

      <div class="calc__body animate-on-scroll">
        <div class="calc__inputs">
          <label class="calc__field">
            <span class="calc__label">{{ t('calculator.aptLabel') }}</span>
            <span class="calc__value">{{ aptFormatted }}</span>
            <input
              v-model.number="apartments"
              type="range"
              :min="APT_MIN"
              :max="APT_MAX"
              step="100"
              class="calc__slider"
              :style="{ '--fill': aptFill }"
            />
          </label>
          <label class="calc__field">
            <span class="calc__label">{{ t('calculator.billLabel') }}</span>
            <span class="calc__value">{{ billFormatted }}</span>
            <input
              v-model.number="avgBill"
              type="range"
              :min="BILL_MIN"
              :max="BILL_MAX"
              step="500"
              class="calc__slider"
              :style="{ '--fill': billFill }"
            />
          </label>
        </div>

        <div class="calc__result">
          <span class="calc__result-label">{{ t('calculator.resultLabel') }}</span>
          <div class="calc__result-value">
            +{{ lowM }}–{{ highM }}
            <span class="calc__result-unit">{{ t('calculator.unit') }}</span>
          </div>
          <p class="calc__result-note">{{ t('calculator.resultNote') }}</p>
          <div class="calc__extras">
            <p class="calc__extra">{{ t('calculator.extra1') }}</p>
            <p class="calc__extra">{{ t('calculator.extra2') }}</p>
          </div>
        </div>
      </div>

      <p class="calc__disclaimer">{{ t('calculator.disclaimer') }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.calc {
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

  &__divider {
    height: 1px;
    background: $color-gray-light;
    margin: 28px 0 44px;

    @include mobile {
      margin: 16px 0 28px;
    }
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 64px;
    align-items: center;
    max-width: 1040px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    @include tablet {
      gap: 40px;
    }

    @include mobile {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  &__field {
    display: block;
  }

  &__label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $color-gray;
    margin-bottom: 6px;
  }

  &__value {
    display: block;
    font-family: $font-display;
    font-size: 30px;
    font-weight: 800;
    color: $color-dark;
    margin-bottom: 12px;

    @include mobile {
      font-size: 24px;
    }
  }

  &__slider {
    --fill: 50%;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      $color-primary 0%,
      $color-primary var(--fill),
      $color-gray-light var(--fill),
      $color-gray-light 100%
    );
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid $color-primary;
      box-shadow: 0 2px 10px rgba(32, 34, 41, 0.2);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    &::-webkit-slider-thumb:hover {
      transform: scale(1.12);
      box-shadow: 0 3px 14px rgba(243, 180, 65, 0.45);
    }

    &::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid $color-primary;
      box-shadow: 0 2px 10px rgba(32, 34, 41, 0.2);
    }

    &::-moz-range-track {
      height: 4px;
      border-radius: 2px;
      background: $color-gray-light;
    }

    &::-moz-range-progress {
      height: 4px;
      border-radius: 2px;
      background: $color-primary;
    }
  }

  &__result {
    border-left: 3px solid $color-primary;
    padding-left: 32px;

    @include mobile {
      padding-left: 20px;
    }
  }

  &__result-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $color-primary-active;
    margin-bottom: 10px;
  }

  &__result-value {
    font-family: $font-display;
    font-size: 40px;
    font-weight: 800;
    line-height: 1.1;
    color: $color-primary;
    white-space: nowrap;

    @include tablet {
      font-size: 31px;
    }

    @include mobile {
      font-size: 24px;
    }
  }

  &__result-unit {
    display: block;
    font-size: 17px;
    font-weight: 700;
    color: $color-dark;
    margin-top: 6px;

    @include mobile {
      font-size: 15px;
    }
  }

  &__result-note {
    font-size: 14px;
    color: $color-gray;
    margin-top: 8px;
  }

  &__extras {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__extra {
    font-size: 14.5px;
    font-weight: 600;
    color: $color-dark;
    line-height: 1.5;
  }

  &__disclaimer {
    margin: 40px auto 0;
    max-width: 1040px;
    font-size: 12px;
    color: $color-gray;
    font-style: italic;

    @include mobile {
      margin-top: 28px;
    }
  }
}
</style>
