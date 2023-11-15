import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение


const App = defineComponent({
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        counter() {
            this.count++
        }
    }
})

const app = createApp(App)
const vm = app.mount('#app')