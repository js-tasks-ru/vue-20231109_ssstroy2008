import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  props: {
    agenda: {
      type: Array,
      required: true
    }
  },
  components: {
    MeetupAgendaItem
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item">
        <MeetupAgendaItem :agendaItem="agenda[0]"/>
        <MeetupAgendaItem :agendaItem="agenda[1]"/>
        <MeetupAgendaItem :agendaItem="agenda[2]"/>
      </li>
    </ul>`,
});
