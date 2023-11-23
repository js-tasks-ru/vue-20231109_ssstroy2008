import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from '/02-components/07-PageMeetup/meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data() {
    return {
      meetup: null
    }
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  watch: {
    meetupId() {
      this.fetchMeetupId()

    }
  },

  methods: {
    fetchMeetupId() {
      fetchMeetupById(this.meetupId).then((meet) => {
        this.meetup = meet
      }).catch((err) => {
        this.meetup = undefined
     });
    }
  },
  created() {
    fetchMeetupById(this.meetupId).then((meet) => {
      this.meetup = meet
    }).catch((err) => {
      this.meetup = undefined
   });
  },

  template: `
    <div class="page-meetup">
    

      <template v-if="meetup">
        <MeetupView :meetup="meetup"/>
      </template>
      
      <UiContainer v-else-if="meetup === undefined">
        <UiAlert>error</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="!meetup">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>



    </div>`,
});
