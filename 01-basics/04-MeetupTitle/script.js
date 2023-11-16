import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

async function fetchMeetupById() {
    return await fetch(`${API_URL}/meetups/`).then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const error = await response.json();
        throw error;
      }
    
  });
}
// Требуется создать Vue приложение
const App = defineComponent({
  name: 'App',

  data() {
      return {
        meetups: null,
        result: [],
        title: '',
        state: null
      }
  },

  watch: {
    state() {
      for (let i = 0; i < this.result.length; i++) {
        if (this.state === i + 1) {
          this.title = this.result[i]
        }
      }
    }
  },

  mounted() {
    this.meetups = fetchMeetupById()
    let result = this.result
    this.meetups.then(function(meetup) {
      for (let i = 0; i < meetup.length; i++) {
        result.push(meetup[i].title)
      }
    });
  },
})


const app = createApp(App)
const vm = app.mount('#app')