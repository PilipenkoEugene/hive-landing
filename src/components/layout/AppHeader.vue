<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LangSwitcher from '@/components/ui/LangSwitcher.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'

const { t } = useI18n()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('')

const navItems = [
  { key: 'features', anchor: '#features' },
  { key: 'audience', anchor: '#audience' },
  { key: 'screenshots', anchor: '#screenshots' },
  { key: 'contacts', anchor: '#cta' }
]

const sectionIds = ['features', 'audience', 'screenshots', 'cta']

function handleScroll() {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

function updateActiveSection() {
  const threshold = 200
  let current = ''

  // If scrolled to bottom — always highlight last section (contacts)
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
  if (atBottom) {
    activeSection.value = 'cta'
    return
  }

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= threshold && rect.bottom > 0) {
      current = id
    }
  }

  activeSection.value = current
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollTo(anchor: string) {
  const el = document.querySelector(anchor) as HTMLElement | null
  if (!el) return

  // Get natural position (without CSS transform)
  const rect = el.getBoundingClientRect()
  const style = window.getComputedStyle(el)
  const matrix = new DOMMatrix(style.transform)
  const currentTranslateY = matrix.m42
  const naturalTop = rect.top + window.scrollY - currentTranslateY

  // Calculate what the transform will be at destination
  // At destination: rect.top ≈ headerH, progress = 1 - headerH/viewH
  const headerH = 80
  const compressionActive = window.innerWidth >= 1024
  const maxShift = compressionActive
    ? Number(el.dataset.compress) || (el.classList.contains('scroll-compress') ? 60 : 0)
    : 0
  const destProgress = Math.max(0, Math.min(1, 1 - headerH / window.innerHeight))
  const destTransform = destProgress * maxShift

  const target = naturalTop - headerH - destTransform
  window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container">
      <a class="header__logo" @click.prevent="scrollToTop" href="#" aria-label="Hive">
        <svg class="header__logo-mark" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M56,7 L84,23 Q90,27 90,34 L90,66 Q90,73 84,77 L56,93 Q50,96 44,93 L16,77 Q10,73 10,66 L10,34 Q10,27 16,23 L44,7 Q50,4 56,7 Z" />
        </svg>
        <span class="header__logo-text">Hive</span>
      </a>

      <nav class="header__nav">
        <a
          v-for="item in navItems"
          :key="item.key"
          class="header__link"
          :class="{ 'header__link--active': activeSection === item.anchor.slice(1) }"
          @click.prevent="scrollTo(item.anchor)"
          :href="item.anchor"
        >
          {{ t(`header.${item.key}`) }}
        </a>
      </nav>

      <div class="header__right">
        <LangSwitcher />
        <button class="header__burger" @click="isMobileMenuOpen = true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <MobileMenu :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;

  &--scrolled {
    background: rgba($color-light, 0.85);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
  }

  &__container {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  &__logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__logo-mark {
    width: 30px;
    height: 30px;
    fill: $color-dark;
  }

  &__logo-text {
    font-family: $font-display;
    font-size: 23px;
    font-weight: 800;
    color: $color-dark;
    letter-spacing: -0.01em;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 32px;

    @include mobile {
      display: none;
    }
  }

  &__link {
    font-size: $font-size-small;
    font-weight: 500;
    color: $color-dark;
    transition: color 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: $color-primary;
      transition: width 0.3s ease;
    }

    &:hover,
    &--active {
      color: $color-primary;

      &::after {
        width: 100%;
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__burger {
    display: none;
    color: $color-dark;

    @include mobile {
      display: flex;
    }
  }
}
</style>
