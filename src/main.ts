import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import ru from './locales/ru.json'
import en from './locales/en.json'
import uz from './locales/uz.json'
import './assets/styles/global.scss'

function detectLang(): string {
  const saved = localStorage.getItem('hive-lang')
  if (saved && ['ru', 'uz', 'en'].includes(saved)) return saved
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('uz')) return 'uz'
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLang(),
  fallbackLocale: 'ru',
  messages: { ru, en, uz }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
