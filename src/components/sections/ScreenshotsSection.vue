<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const { t, tm } = useI18n()

const swiperInstance = ref<any>(null)
const activeRealIndex = ref(0)

const webImages = import.meta.glob('@/assets/screenshots/web/*.{png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>
const mobileImages = import.meta.glob('@/assets/screenshots/mobile/*.{png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>

function getImage(filename: string, type: string): string {
  const images = type === 'web' ? webImages : mobileImages
  const key = Object.keys(images).find(k => k.endsWith(`/${filename}`))
  return (key && images[key]) || ''
}

const slides = computed(() => {
  const raw = tm('screenshots.slides') as any[]
  return raw.map((_, i) => ({
    type: t(`screenshots.slides[${i}].type`) as 'web' | 'mobile',
    label: t(`screenshots.slides[${i}].label`),
    file: t(`screenshots.slides[${i}].file`),
    index: i,
  }))
})

// Triple slides for seamless infinite loop
const loopSlides = computed(() => {
  const base = slides.value
  return [...base, ...base, ...base]
})

const slideCount = computed(() => slides.value.length)

function onSwiper(swiper: any) {
  swiperInstance.value = swiper
  // Land on the first slide of the middle copy (Swiper can snap elsewhere on init)
  swiper.slideTo(slideCount.value, 0)
}

function onSlideChangeTransitionEnd(swiper: any) {
  const total = slideCount.value
  const idx = swiper.activeIndex

  if (idx < total || idx >= total * 2) {
    const target = idx < total ? idx + total : idx - total
    const allSlides = swiper.el.querySelectorAll('.swiper-slide') as NodeListOf<HTMLElement>

    // Disable all transitions via inline styles
    swiper.wrapperEl.style.transition = 'none'
    allSlides.forEach((el: HTMLElement) => { el.style.transition = 'none' })

    // Force reflow so browser applies no-transition before jump
    void swiper.el.offsetHeight

    swiper.slideTo(target, 0)

    // Force reflow so browser paints the jumped state without transitions
    void swiper.el.offsetHeight

    // Restore transitions after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        swiper.wrapperEl.style.transition = ''
        allSlides.forEach((el: HTMLElement) => { el.style.transition = '' })
      })
    })
  }
}

function onSlideChange(swiper: any) {
  activeRealIndex.value = swiper.activeIndex % slideCount.value
}

function goToSlide(realIndex: number) {
  if (!swiperInstance.value) return
  // Jump to the slide in the middle copy
  swiperInstance.value.slideTo(slideCount.value + realIndex)
}
</script>

<template>
  <section id="screenshots" class="screenshots">
    <div class="screenshots__container">
      <span class="screenshots__eyebrow">{{ t('screenshots.eyebrow') }}</span>
      <h2 class="screenshots__title">{{ t('screenshots.title') }}</h2>

      <div class="screenshots__wrapper">
        <!-- Custom arrows outside swiper -->
        <button class="screenshots__arrow screenshots__arrow--prev" @click="swiperInstance?.slidePrev()" aria-label="Previous">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div class="screenshots__carousel">
          <Swiper
            slides-per-view="auto"
            :space-between="32"
            :centered-slides="true"
            :initial-slide="slideCount"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
            @slide-change-transition-end="onSlideChangeTransitionEnd"
            :breakpoints="{
              768: { spaceBetween: 40 },
              1024: { spaceBetween: 48 }
            }"
            class="screenshots__swiper"
          >
            <SwiperSlide
              v-for="(slide, si) in loopSlides"
              :key="si"
            >
              <!-- Web: browser mockup -->
              <div v-if="slide.type === 'web'" class="screenshots__slide screenshots__slide--web">
                <div class="screenshots__browser">
                  <div class="screenshots__browser-bar">
                    <div class="screenshots__browser-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div class="screenshots__browser-url">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      <span>app.hive.land</span>
                    </div>
                  </div>
                  <img
                    :src="getImage(slide.file, 'web')"
                    :alt="slide.label"
                    class="screenshots__web-img"
                  />
                </div>
                <p class="screenshots__caption">{{ slide.label }}</p>
              </div>

              <!-- Mobile: single phone mockup -->
              <div v-else class="screenshots__slide screenshots__slide--mobile">
                <div class="screenshots__iphone">
                  <div class="screenshots__iphone-frame">
                    <!-- Side buttons -->
                    <div class="screenshots__iphone-btn screenshots__iphone-btn--action"></div>
                    <div class="screenshots__iphone-btn screenshots__iphone-btn--vol-up"></div>
                    <div class="screenshots__iphone-btn screenshots__iphone-btn--vol-down"></div>
                    <div class="screenshots__iphone-btn screenshots__iphone-btn--power"></div>
                    <div class="screenshots__iphone-btn screenshots__iphone-btn--camera"></div>
                    <div class="screenshots__iphone-screen">
                      <div class="screenshots__iphone-island"></div>
                      <img
                        :src="getImage(slide.file, 'mobile')"
                        :alt="slide.label"
                        class="screenshots__mobile-img"
                      />
                      <div class="screenshots__iphone-homebar"></div>
                    </div>
                  </div>
                </div>
                <p class="screenshots__caption">{{ slide.label }}</p>
              </div>
            </SwiperSlide>
          </Swiper>

          <!-- Custom pagination -->
          <div class="screenshots__pagination">
            <button
              v-for="(_, i) in slides"
              :key="i"
              class="screenshots__dot"
              :class="{ 'screenshots__dot--active': activeRealIndex === i }"
              @click="goToSlide(i)"
              :aria-label="`Slide ${i + 1}`"
            />
          </div>
        </div>

        <button class="screenshots__arrow screenshots__arrow--next" @click="swiperInstance?.slideNext()" aria-label="Next">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.screenshots {
  @include section-padding;
  position: relative;
  z-index: 1;

  &__container {
    @include container;
    position: relative;
  }

  &__eyebrow {
    @include section-eyebrow;
  }

  &__title {
    @include section-title;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__arrow {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color-primary, 0.12);
    border: none;
    border-radius: 50%;
    color: $color-primary;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;

    svg {
      width: 22px;
      height: 22px;
    }

    &:hover {
      background: $color-primary;
      color: #fff;
      box-shadow: 0 4px 16px rgba(243, 180, 65, 0.35);
    }

    @include mobile {
      width: 34px;
      height: 34px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  &__carousel {
    flex: 1;
    min-width: 0;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
  }

  &__swiper {
    :deep(.swiper-slide) {
      transition: transform 0.5s ease, opacity 0.5s ease;
      opacity: 0.7;
      transform: scale(0.95);
      width: 75%;

      @include mobile {
        width: 85%;
      }
    }

    :deep(.swiper-slide:has(.screenshots__slide--mobile)) {
      width: 280px;

      @include tablet {
        width: 260px;
      }

      @include mobile {
        width: 200px;
      }
    }

    :deep(.swiper-slide-active) {
      opacity: 1;
      transform: scale(1);
    }

  }

  &__pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-top: 24px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: $color-gray-light;
    transition: background 0.3s ease;

    &--active {
      background: $color-primary;
    }
  }

  &__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  // --- Web slide: full width browser mockup ---
  &__browser {
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.08);
    width: 100%;
  }

  &__browser-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: #F6F6F6;
    border-bottom: 1px solid #E8E8EA;
  }

  &__browser-dots {
    display: flex;
    gap: 6px;

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &:nth-child(1) { background: #FF5F57; }
      &:nth-child(2) { background: #FEBC2E; }
      &:nth-child(3) { background: #28C840; }
    }
  }

  &__browser-url {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid #E8E8EA;
    border-radius: 6px;
    padding: 4px 12px;
    font-size: 12px;
    color: $color-gray;
    flex: 1;
    max-width: 300px;

    svg {
      flex-shrink: 0;
      opacity: 0.4;
    }
  }

  &__web-img {
    width: 100%;
    display: block;
  }

  // --- iPhone 17 Pro Max mockup ---
  &__iphone {
    display: flex;
    justify-content: center;
  }

  &__iphone-frame {
    position: relative;
    width: 220px;
    background: linear-gradient(165deg, #2A2E3A, #1C1E26, #252830);
    border-radius: 44px;
    padding: 4px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.06),
      0 2px 12px rgba(0,0,0,0.3);

    @include tablet {
      width: 200px;
      border-radius: 40px;
    }

    @include mobile {
      width: 160px;
      border-radius: 34px;
      padding: 3px;
    }
  }

  // Side buttons
  &__iphone-btn {
    position: absolute;
    background: linear-gradient(165deg, #3A3D48, #2E3038, #282B34);
    border-radius: 2px;

    // Left: action button
    &--action {
      left: -3px;
      top: 22%;
      width: 3px;
      height: 20px;
      border-radius: 2px 0 0 2px;
    }

    // Left: volume up
    &--vol-up {
      left: -3px;
      top: 30%;
      width: 3px;
      height: 36px;
      border-radius: 2px 0 0 2px;
    }

    // Left: volume down
    &--vol-down {
      left: -3px;
      top: 40%;
      width: 3px;
      height: 36px;
      border-radius: 2px 0 0 2px;
    }

    // Right: power
    &--power {
      right: -3px;
      top: 30%;
      width: 3px;
      height: 44px;
      border-radius: 0 2px 2px 0;
      background: linear-gradient(165deg, #3E4250, #32353F, #2A2D36);
    }

    // Right: camera control (recessed into frame)
    &--camera {
      right: -1px;
      top: 54%;
      width: 2px;
      height: 52px;
      border-radius: 0 3px 3px 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.06) 100%);
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.4);
    }

    @include mobile {
      &--action { height: 16px; }
      &--vol-up, &--vol-down { height: 28px; }
      &--power { height: 36px; }
      &--camera { height: 42px; }
    }
  }

  &__iphone-screen {
    position: relative;
    background: #000;
    border-radius: 40px;
    overflow: hidden;
    aspect-ratio: 9 / 19.5;

    @include tablet {
      border-radius: 37px;
    }

    @include mobile {
      border-radius: 31px;
    }
  }

  &__iphone-island {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 26%;
    height: 17px;
    background: #000;
    border-radius: 10px;
    z-index: 2;

    @include mobile {
      height: 14px;
      top: 8px;
      border-radius: 8px;
    }
  }

  &__mobile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__iphone-homebar {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 96px;
    height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    z-index: 2;

    @include mobile {
      width: 72px;
      height: 3px;
      bottom: 6px;
    }
  }

  &__caption {
    font-size: $font-size-small;
    color: $color-gray;
    text-align: center;
  }
}
</style>
