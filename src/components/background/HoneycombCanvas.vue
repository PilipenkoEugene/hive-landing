<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animationId: number = 0
let mouseX = -1000
let mouseY = -1000
let time = 0
let isVisible = true

const HEX_SIZE = 45
const CURSOR_RADIUS = 220
const FADE_SPEED = 0.012
const COLOR_PERIOD = 5000

// More hotspots, slower; kept quiet — the page should read clean
const HOTSPOT_COUNT = 14
const HOTSPOT_RADIUS = 280
const HOTSPOT_MAX_OPACITY = 0.35

interface Hotspot {
  x: number
  y: number
  vx: number
  vy: number
  phase: number
  phaseSpeed: number
}

let hotspots: Hotspot[] = []

function initHotspots() {
  hotspots = []
  for (let i = 0; i < HOTSPOT_COUNT; i++) {
    hotspots.push({
      x: width * 0.05 + Math.random() * width * 0.9,
      y: height * 0.05 + Math.random() * height * 0.9,
      // Slower movement
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      // Evenly stagger phases
      phase: (i / HOTSPOT_COUNT) * Math.PI * 2,
      // Slower pulsing
      phaseSpeed: 0.0003 + Math.random() * 0.00025
    })
  }
}

function updateHotspots(dt: number) {
  for (const h of hotspots) {
    h.x += h.vx * dt
    h.y += h.vy * dt
    h.phase += h.phaseSpeed * dt

    if (h.x < 0) { h.x = 0; h.vx = Math.abs(h.vx) * (0.5 + Math.random() * 0.5) }
    if (h.x > width) { h.x = width; h.vx = -Math.abs(h.vx) * (0.5 + Math.random() * 0.5) }
    if (h.y < 0) { h.y = 0; h.vy = Math.abs(h.vy) * (0.5 + Math.random() * 0.5) }
    if (h.y > height) { h.y = height; h.vy = -Math.abs(h.vy) * (0.5 + Math.random() * 0.5) }

    h.vx += (Math.random() - 0.5) * 0.008
    h.vy += (Math.random() - 0.5) * 0.008

    const speed = Math.sqrt(h.vx * h.vx + h.vy * h.vy)
    if (speed > 0.6) {
      h.vx = (h.vx / speed) * 0.6
      h.vy = (h.vy / speed) * 0.6
    }
    if (speed < 0.15) {
      h.vx += (Math.random() - 0.5) * 0.3
      h.vy += (Math.random() - 0.5) * 0.3
    }
  }
}

function getHotspotInfluence(cx: number, cy: number): number {
  let maxInfluence = 0
  for (const h of hotspots) {
    const dx = cx - h.x
    const dy = cy - h.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < HOTSPOT_RADIUS) {
      const brightness = Math.max(0, Math.sin(h.phase)) * HOTSPOT_MAX_OPACITY
      const falloff = 1 - dist / HOTSPOT_RADIUS
      maxInfluence = Math.max(maxInfluence, brightness * falloff * falloff)
    }
  }
  return maxInfluence
}

interface HexCell {
  x: number
  y: number
  opacity: number
}

let cells: HexCell[] = []
let width = 0
let height = 0
let dpr = 1
let lastTime = 0

function buildGrid() {
  cells = []
  const hexW = HEX_SIZE * 2
  const hexH = Math.sqrt(3) * HEX_SIZE
  const cols = Math.ceil(width / (hexW * 0.75)) + 2
  const rows = Math.ceil(height / hexH) + 2

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexW * 0.75
      const y = row * hexH + (col % 2 === 1 ? hexH / 2 : 0)
      cells.push({ x, y, opacity: 0 })
    }
  }
}

function getColor(x: number, y: number, t: number): string {
  const phase = (x * 0.005 + y * 0.005 + t / COLOR_PERIOD) * Math.PI * 2
  const sin = Math.sin(phase)

  if (sin > 0.5) {
    return lerpColor('#F3B441', '#F0C97A', (sin - 0.5) * 2)
  } else if (sin > 0) {
    return lerpColor('#F0C97A', '#E8DCC8', 1 - sin * 2)
  } else if (sin > -0.5) {
    return lerpColor('#E8DCC8', '#D4C5F0', 1 - (sin + 0.5) * 2)
  } else {
    return lerpColor('#D4C5F0', '#F3B441', 1 - (sin + 1) * 2)
  }
}

function lerpColor(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16)
  const ag = parseInt(a.slice(3, 5), 16)
  const ab = parseInt(a.slice(5, 7), 16)
  const br = parseInt(b.slice(1, 3), 16)
  const bg = parseInt(b.slice(3, 5), 16)
  const bb = parseInt(b.slice(5, 7), 16)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bv = Math.round(ab + (bb - ab) * t)
  return `rgb(${r},${g},${bv})`
}

function drawHex(cx: number, cy: number, size: number) {
  if (!ctx) return
  const r = size * 0.12 // corner radius (~12% of size)
  const pts: [number, number][] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    pts.push([cx + size * Math.cos(angle), cy + size * Math.sin(angle)])
  }
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const curr = pts[i]!
    const next = pts[(i + 1) % 6]!
    const prev = pts[(i + 5) % 6]!
    // Shorten towards prev and next by radius
    const dx1 = prev[0] - curr[0], dy1 = prev[1] - curr[1]
    const dx2 = next[0] - curr[0], dy2 = next[1] - curr[1]
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
    const p1x = curr[0] + (dx1 / len1) * r, p1y = curr[1] + (dy1 / len1) * r
    const p2x = curr[0] + (dx2 / len2) * r, p2y = curr[1] + (dy2 / len2) * r
    if (i === 0) ctx.moveTo(p1x, p1y)
    else ctx.lineTo(p1x, p1y)
    ctx.quadraticCurveTo(curr[0], curr[1], p2x, p2y)
  }
  ctx.closePath()
}

function render() {
  if (!ctx || !isVisible) {
    animationId = requestAnimationFrame(render)
    return
  }

  time = performance.now()
  const dt = lastTime ? time - lastTime : 16
  lastTime = time

  updateHotspots(dt)
  ctx.clearRect(0, 0, width * dpr, height * dpr)

  for (const cell of cells) {
    const BASE_OPACITY = 0.06
    let targetOpacity = BASE_OPACITY

    // Cursor proximity
    const dx = cell.x - mouseX
    const dy = cell.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < CURSOR_RADIUS) {
      const falloff = 1 - dist / CURSOR_RADIUS
      targetOpacity = Math.max(targetOpacity, falloff * falloff * 0.6)
    }

    // Phantom hotspots
    const hotspotOpacity = getHotspotInfluence(cell.x, cell.y)
    targetOpacity = Math.max(targetOpacity, hotspotOpacity)

    // Smooth towards target
    if (targetOpacity > cell.opacity) {
      cell.opacity = Math.min(cell.opacity + 0.03, targetOpacity)
    } else {
      cell.opacity = Math.max(cell.opacity - FADE_SPEED, BASE_OPACITY)
    }

    if (cell.opacity > 0.01) {
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.globalAlpha = cell.opacity
      const color = getColor(cell.x, cell.y, time)
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      drawHex(cell.x, cell.y, HEX_SIZE * 0.9)
      ctx.stroke()
      ctx.restore()
    }
  }

  animationId = requestAnimationFrame(render)
}

function resize() {
  if (!canvas.value) return
  dpr = Math.min(window.devicePixelRatio, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  canvas.value.style.width = width + 'px'
  canvas.value.style.height = height + 'px'
  buildGrid()
  initHotspots()
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function onMouseLeave() {
  mouseX = -1000
  mouseY = -1000
}

function onTouchMove(e: TouchEvent) {
  const touch = e.touches[0]
  if (touch) {
    mouseX = touch.clientX
    mouseY = touch.clientY
  }
}

function onScroll() {
  if (window.innerWidth < 768) {
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
  }
}

function onVisibilityChange() {
  isVisible = !document.hidden
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d') || null
  resize()
  render()

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <canvas ref="canvas" class="honeycomb-canvas" />
</template>

<style scoped>
.honeycomb-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
}
</style>
