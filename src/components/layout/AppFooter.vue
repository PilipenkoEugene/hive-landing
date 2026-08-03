<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const navItems = [
  { key: 'features', anchor: '#features' },
  { key: 'audience', anchor: '#audience' },
  { key: 'screenshots', anchor: '#screenshots' },
  { key: 'contacts', anchor: '#cta' }
]

function scrollTo(anchor: string) {
  const el = document.querySelector(anchor)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer__container">
      <div class="footer__grid">
        <!-- About -->
        <div class="footer__col">
          <a class="footer__logo" href="#" @click.prevent="scrollTo('body')" aria-label="Hive">
            <svg class="footer__logo-mark" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M56,7 L84,23 Q90,27 90,34 L90,66 Q90,73 84,77 L56,93 Q50,96 44,93 L16,77 Q10,73 10,66 L10,34 Q10,27 16,23 L44,7 Q50,4 56,7 Z" />
            </svg>
            <span class="footer__logo-text">Hive</span>
          </a>
          <p class="footer__description">{{ t('footer.description') }}</p>
        </div>

        <!-- Navigation -->
        <div class="footer__col">
          <h4 class="footer__heading">{{ t('footer.navigation') }}</h4>
          <nav class="footer__nav">
            <a
              v-for="item in navItems"
              :key="item.key"
              class="footer__link"
              :href="item.anchor"
              @click.prevent="scrollTo(item.anchor)"
            >
              {{ t(`header.${item.key}`) }}
            </a>
          </nav>
        </div>

        <!-- Contacts -->
        <div class="footer__col">
          <h4 class="footer__heading">{{ t('footer.contactsTitle') }}</h4>
          <div class="footer__contacts">
            <a href="https://t.me/dmitry_hive" target="_blank" rel="noopener" class="footer__link">Telegram · @dmitry_hive</a>
            <a href="https://instagram.com/hive.platform" target="_blank" rel="noopener" class="footer__link">Instagram · @hive.platform</a>
          </div>
        </div>

        <!-- Social -->
        <div class="footer__col">
          <h4 class="footer__heading">{{ t('footer.social') }}</h4>
          <div class="footer__social">
            <!-- Telegram -->
            <a href="https://t.me/dmitry_hive" target="_blank" rel="noopener" class="footer__social-link" aria-label="Telegram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 4-1.73 6.67-2.88 8.01-3.44 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.47-.01.06.01.24 0 .37z"/></svg>
            </a>
            <!-- Instagram -->
            <a href="https://instagram.com/hive.platform" target="_blank" rel="noopener" class="footer__social-link" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p>{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: $color-dark;
  padding: 48px 0 0;
  position: relative;
  z-index: 1;
  flex-shrink: 0;

  &__container {
    @include container;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    padding-bottom: 48px;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  &__logo-mark {
    width: 28px;
    height: 28px;
    fill: $color-light;
  }

  &__logo-text {
    font-family: $font-display;
    font-size: 22px;
    font-weight: 800;
    color: $color-light;
    letter-spacing: -0.01em;
  }

  &__description {
    font-size: $font-size-small;
    color: rgba($color-light, 0.7);
    line-height: 1.6;
  }

  &__heading {
    font-size: $font-size-body;
    font-weight: 600;
    color: $color-light;
    margin-bottom: 16px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__link {
    font-size: $font-size-small;
    color: rgba($color-light, 0.7);
    transition: color 0.3s ease;

    &:hover {
      color: $color-primary;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__social {
    display: flex;
    gap: 12px;
  }

  &__social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba($color-light, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-light;
    transition: all 0.3s ease;

    &:hover {
      background: $color-primary;
      color: $color-dark;
    }
  }

  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px 0;
    text-align: center;

    p {
      font-size: $font-size-caption;
      color: rgba($color-light, 0.5);
    }
  }
}
</style>
