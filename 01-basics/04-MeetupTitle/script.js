import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

async function fetchMeetupById(meetupId) {
  return await fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  name: 'App',

  data() {
      return {
        meetups: null,
        result: ["MSK VUE.JS MEETUP #1", "MSK VUE.JS MEETUP #2", "MSK VUE.JS MEETUP #3", "MSK VUE.JS MEETUP #4"],
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
    this.meetups = fetchMeetupById(5) 
    let result = this.result
    this.meetups.then(function(meetup) {
      result.push(meetup.title)
    });
  },
  
})


const app = createApp(App)
const vm = app.mount('#app')