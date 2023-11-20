import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
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
      state: null,
      choosenMeetup: null,
      meetupTitle: null
    }
  },

  watch: {
    state() {
      this.outputTitle()
    }
  },

  methods: {
    outputTitle() {
      this.choosenMeetup = fetchMeetupById(this.state).then((name) => {
        this.meetupTitle = name.title
      })
    }
  },

})


const app = createApp(App)
const vm = app.mount('#app')