import { ref } from 'vue'

export function useCountUp(target: number, duration: number = 2000, isFloat: boolean = false) {
  const current = ref(0)
  let hasAnimated = false

  function animate() {
    if (hasAnimated) return
    hasAnimated = true

    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic

      current.value = isFloat
        ? Math.round(target * eased * 10) / 10
        : Math.floor(target * eased)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        current.value = target
      }
    }

    requestAnimationFrame(step)
  }

  return { current, animate }
}
