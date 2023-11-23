import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupDescription from '/02-components/02-MeetupDescription/components/MeetupDescription.js'
import MeetupCover from '/02-components/03-MeetupCover/components/MeetupCover.js'
import MeetupInfo from '/02-components/04-MeetupInfo/components/MeetupInfo.js'
import MeetupAgenda from '/02-components/05-MeetupAgenda/components/MeetupAgenda.js'
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '/02-components/07-PageMeetup/meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
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
