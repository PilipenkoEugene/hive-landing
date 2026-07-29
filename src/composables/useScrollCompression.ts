import { onMounted, onUnmounted } from 'vue'

/**
 * Smoothly compresses vertical spacing between sections as user scrolls.
 * Uses data-compress attribute for per-element max shift (default 60px).
 * Disabled below 1024px — on tight layouts the shift makes sections collide.
 */
export function useScrollCompression(defaultShift = 60) {
  let ticking = false

  function update() {
    const sections = document.querySelectorAll<HTMLElement>('.scroll-compress')
    const viewH = window.innerHeight
    const disabled = window.innerWidth < 1024

    sections.forEach((el) => {
      if (disabled) {
        el.style.transform = ''
        return
      }
      const rect = el.getBoundingClientRect()
      const maxShift = Number(el.dataset.compress) || defaultShift
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewH))
      el.style.transform = `translateY(${-progress * maxShift}px)`
    })

    ticking = false
  }

  function schedule() {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })
}
