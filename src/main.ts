import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import ru from './locales/ru.json'
import en from './locales/en.json'
import kz from './locales/kz.json'
import './assets/styles/global.scss'

function detectLang(): string {
  const saved = localStorage.getItem('hive-lang')
  if (saved && ['ru', 'kz', 'en'].includes(saved)) return saved
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('kk') || nav.startsWith('kz')) return 'kz'
  if (nav.startsWith('en')) return 'en'
  return 'ru'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLang(),
  fallbackLocale: 'ru',
  messages: { ru, en, kz }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
