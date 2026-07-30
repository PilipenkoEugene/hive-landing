<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const langs = ['ru', 'kz', 'en'] as const

function setLang(lang: string) {
  locale.value = lang
  localStorage.setItem('hive-lang', lang)
}
</script>

<template>
  <div class="lang-switcher">
    <template v-for="(lang, i) in langs" :key="lang">
      <button
        class="lang-switcher__item"
        :class="{ active: locale === lang }"
        @click="setLang(lang)"
      >
        {{ lang.toUpperCase() }}
      </button>
      <span v-if="i < langs.length - 1" class="lang-switcher__divider">|</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: $font-size-small;
  font-weight: 500;
  color: $color-gray;

  &__item {
    cursor: pointer;
    color: $color-gray;
    font-size: $font-size-small;
    font-weight: 500;
    padding: 0;
    transition: color 0.3s ease;

    &:hover {
      color: $color-dark;
    }

    &.active {
      color: $color-primary;
      font-weight: 700;
    }
  }

  &__divider {
    color: $color-gray-light;
    user-select: none;
  }
}
</style>
