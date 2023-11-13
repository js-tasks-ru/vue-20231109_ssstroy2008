import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = {
    data() {
        return {
            first: 0,
            second: 0,
            result: 0,
            action: null,
        }
    },
    computed: {
        computedResults() {
            if (this.action === 'sum') {
                this.result = this.first + this.second 
            } else if (this.action === 'subtract') {
                this.result = this.first - this.second 
            } else if (this.action === 'multiply') {
                this.result = this.first * this.second 
            } else if (this.action === 'divide') { 
                this.result = this.first / this.second 
            }
            return this.result
        }
    }, 
}


const app = createApp(App)
const vm = app.mount('#app')