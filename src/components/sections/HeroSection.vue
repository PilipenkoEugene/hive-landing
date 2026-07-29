<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import heroScreen from '@/assets/images/hero-screen.jpeg'

const { t } = useI18n()
const scene = ref<HTMLElement>()

function scrollToFeatures() {
  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToCta() {
  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  if (scene.value) {
    const r = Math.sin(window.scrollY * 0.002) * 10
    scene.value.style.setProperty('--sry', `${r}deg`)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__container">
        <div class="hero__content">
          <span class="hero__eyebrow">{{ t('hero.eyebrow') }}</span>
          <h1 class="hero__title">
            {{ t('hero.titleStart') }}
            <span class="hero__title-accent">{{ t('hero.titleAccent') }}</span>
          </h1>
          <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
          <div class="hero__line"></div>
          <div class="hero__cta">
            <BaseButton @click="scrollToCta">{{ t('hero.cta') }}</BaseButton>
            <a class="hero__cta-secondary" href="#features" @click.prevent="scrollToFeatures">
              {{ t('hero.ctaSecondary') }}
            </a>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__shadow"></div>
          <div class="hero__scene" ref="scene">
            <!-- Слои корпуса: 20 × 1.5px дают гладкий бок при вращении -->
            <div
              v-for="i in 20"
              :key="`shell-${i}`"
              class="shell"
              :style="{
                transform: `translateZ(${-i * 1.5}px)`,
                filter: `brightness(${1 - i * 0.012})`
              }"
            ></div>
            <!-- Side buttons -->
            <div class="btn btn--action"></div>
            <div class="btn btn--vol-up"></div>
            <div class="btn btn--vol-down"></div>
            <div class="btn btn--power"></div>
            <div class="btn btn--camera"></div>
            <!-- Front face with screen -->
            <div class="face">
              <div class="screen">
                <img :src="heroScreen" alt="Hive App" class="screen__img" />
                <div class="screen__island"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$pw: 252px;
$ph: 530px;
$pr: 46px;
$bz: 5px;
$depth: 30px;  // total depth = 10 shell layers × 3px each

.hero {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 40px 0 16px;

  @include mobile {
    padding: 24px 0 44px;
  }

  &__inner {
    width: 100%;
  }

  &__container {
    @include container;
    width: 100%;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 48px;
    align-items: center;
    @include tablet {
      grid-template-columns: 1.15fr 1fr;
      gap: 32px;
    }
    @include mobile {
      grid-template-columns: 1fr;
      text-align: center;
      padding-top: 56px;
      gap: 32px;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
  }

  &__eyebrow {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: $color-primary-active;
    margin-bottom: 20px;

    @include mobile {
      font-size: 10px;
      letter-spacing: 0.2em;
      margin-bottom: 14px;
    }
  }

  &__title {
    font-family: $font-display;
    font-size: 54px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: $color-dark;
    margin-bottom: 24px;
    @include tablet { font-size: 36px; }
    @include mobile { font-size: 31px; }
  }

  &__title-accent {
    @include gold-gradient-text;
  }

  &__line {
    width: 56px;
    height: 3px;
    background: $color-primary;
    border-radius: 2px;
    margin-bottom: 32px;

    @include mobile {
      margin: 0 auto 24px;
    }
  }

  &__subtitle {
    font-size: 18px;
    color: $color-gray;
    line-height: 1.6;
    margin-bottom: 32px;
    max-width: 520px;
    @include mobile { max-width: 100%; font-size: 16px; }
  }

  &__cta {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;

      :deep(.base-button) {
        width: 100%;
      }
    }
  }

  &__cta-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 32px;
    border: 1.5px solid rgba(32, 34, 41, 0.22);
    border-radius: $border-radius-sm;
    color: $color-dark;
    font-size: $font-size-body;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.3s ease;

    @include tablet {
      padding: 15px 24px;
    }

    @include mobile {
      width: 100%;
    }

    &:hover {
      border-color: $color-dark;
      background: rgba(32, 34, 41, 0.04);
      transform: translateY(-2px);
    }
  }

  &__visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    perspective-origin: 60% 45%;
    min-height: 580px;
    @include mobile {
      min-height: 545px;
      perspective: 800px;
      margin-top: 0;
    }
  }

  // Статичная тень на «полу» — не вращается вместе с телефоном
  &__shadow {
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    height: 46px;
    background: radial-gradient(
      ellipse,
      rgba(14, 17, 28, 0.34) 0%,
      rgba(14, 17, 28, 0.14) 48%,
      transparent 72%
    );
    filter: blur(10px);
    pointer-events: none;
  }

  &__scene {
    --sry: 0deg;
    position: relative;
    width: $pw;
    height: $ph;
    transform-style: preserve-3d;
    animation: sway 6s ease-in-out infinite;
  }
}

// Слои корпуса — тёмный синий титан; глубина и потемнение задаются
// инлайн-стилями в v-for (translateZ + brightness)
.shell {
  position: absolute;
  inset: 0;
  border-radius: $pr;
  background: linear-gradient(165deg, #3A4155 0%, #2E3447 25%, #252B3C 50%, #2E3447 75%, #3A4155 100%);
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.08);
}

// Side buttons
.btn {
  position: absolute;
  background: linear-gradient(165deg, #3A4155, #2E3447, #252B3C);
  border-radius: 2px;
  transform-style: preserve-3d;

  // Left side buttons
  &--action {
    left: -3px;
    top: 120px;
    width: 3px;
    height: 24px;
    border-radius: 2px 0 0 2px;
    transform: translateZ(-1px);
  }

  &--vol-up {
    left: -3px;
    top: 165px;
    width: 3px;
    height: 42px;
    border-radius: 2px 0 0 2px;
    transform: translateZ(-1px);
  }

  &--vol-down {
    left: -3px;
    top: 215px;
    width: 3px;
    height: 42px;
    border-radius: 2px 0 0 2px;
    transform: translateZ(-1px);
  }

  // Right side buttons
  &--power {
    right: -4px;
    top: 165px;
    width: 4px;
    height: 52px;
    border-radius: 0 2px 2px 0;
    transform: translateZ(-15px);
    background: linear-gradient(165deg, #3E4659, #32384B, #292F40);
  }

  &--camera {
    right: -2px;
    top: 295px;
    width: 3px;
    height: 64px;
    border-radius: 0 6px 6px 0;
    transform: translateZ(-15px);
    background: linear-gradient(180deg, #4A5268 0%, #3A4258 50%, #4A5268 100%);
    box-shadow: inset 0 0 2px rgba(255,255,255,0.15);
  }
}

// Front face
.face {
  position: absolute;
  inset: 0;
  background: #1C2030;
  border-radius: $pr;
  padding: $bz;
  transform: translateZ(0);
  backface-visibility: hidden;
  box-shadow:
    inset 0 0 0 1.5px rgba(255,255,255,0.08),
    0 0 0 1px #252B3C;
}

// Screen
.screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: calc(#{$pr} - #{$bz});
  overflow: hidden;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__island {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 62px;
    height: 20px;
    background: #000;
    border-radius: 14px;
    z-index: 2;
  }
}

@keyframes sway {
  0%, 100% {
    transform:
      rotateX(3deg)
      rotateY(calc(-24deg + var(--sry)))
      rotateZ(4deg);
  }
  50% {
    transform:
      rotateX(-1deg)
      rotateY(calc(-12deg + var(--sry)))
      rotateZ(4deg);
  }
}
</style>
