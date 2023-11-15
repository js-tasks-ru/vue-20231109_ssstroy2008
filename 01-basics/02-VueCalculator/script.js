import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
    name: 'App',

    data() {
        return {
            first: 0,
            second: 0,
            action: null,
        }
    },
    computed: {
        computedResults() {
            let result = 0
            if (this.action === 'sum') {
                result = this.first + this.second 
            } else if (this.action === 'subtract') {
                result = this.first - this.second 
            } else if (this.action === 'multiply') {
                result = this.first * this.second 
            } else if (this.action === 'divide') { 
                result = this.first / this.second 
            }
            return result
        }
    }, 
})


const app = createApp(App)
const vm = app.mount('#app')