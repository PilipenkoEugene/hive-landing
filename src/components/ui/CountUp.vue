<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps<{
  value: number
  suffix: string
  label: string
}>()

const { locale } = useI18n()
const el = ref<HTMLElement>()
const isFloat = props.value % 1 !== 0
const { current, animate } = useCountUp(props.value, 2000, isFloat)

const formatted = computed(() => {
  const loc = locale.value === 'en' ? 'en-US' : 'ru-RU'
  return isFloat
    ? current.value.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : current.value.toLocaleString(loc)
})

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        animate()
        el.value?.classList.add('animate-in')
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <div class="count-up" ref="el">
    <div class="count-up__value">
      {{ formatted }}<span class="count-up__suffix">{{ suffix }}</span>
    </div>
    <div class="count-up__label">{{ label }}</div>
  </div>
</template>

<style scoped lang="scss">
.count-up {
  text-align: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &__value {
    font-family: $font-display;
    font-size: 44px;
    font-weight: 800;
    line-height: 1.25;
    color: $color-primary;

    @include mobile {
      font-size: 28px;
    }
  }

  &__suffix {
    font-size: 0.6em;
    opacity: 0.9;
  }

  &__label {
    font-size: $font-size-body;
    color: $color-light;
    opacity: 0.7;
    margin-top: 10px;
    letter-spacing: 0.02em;
  }
}
</style>
