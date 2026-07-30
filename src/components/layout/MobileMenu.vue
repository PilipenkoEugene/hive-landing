<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LangSwitcher from '@/components/ui/LangSwitcher.vue'

const { t } = useI18n()

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

watch(
  () => props.isOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)

const navItems = [
  { key: 'features', anchor: '#features' },
  { key: 'audience', anchor: '#audience' },
  { key: 'screenshots', anchor: '#screenshots' },
  { key: 'contacts', anchor: '#cta' }
]

function handleNavClick(anchor: string) {
  emit('close')
  // ждём закрытия меню и снятия overflow-lock с body,
  // иначе плавный скролл обрывается и не доезжает до секции
  window.setTimeout(() => {
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }, 80)
}
</script>

<template>
  <Transition name="menu">
    <div v-if="isOpen" class="mobile-menu" @click.self="emit('close')">
      <div class="mobile-menu__content">
        <button class="mobile-menu__close" @click="emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav class="mobile-menu__nav">
          <a
            v-for="item in navItems"
            :key="item.key"
            class="mobile-menu__link"
            @click.prevent="handleNavClick(item.anchor)"
          >
            {{ t(`header.${item.key}`) }}
          </a>
        </nav>
        <LangSwitcher />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(32, 34, 41, 0.5);
  backdrop-filter: blur(4px);

  &__content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 80%;
    max-width: 320px;
    background: $color-light;
    padding: 80px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: $color-dark;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    flex: 1;
  }

  &__link {
    font-size: 20px;
    font-weight: 500;
    color: $color-dark;
    transition: color 0.3s ease;

    &:hover {
      color: $color-primary;
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;

  .mobile-menu__content {
    transition: transform 0.3s ease;
  }
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;

  .mobile-menu__content {
    transform: translateX(100%);
  }
}
</style>
