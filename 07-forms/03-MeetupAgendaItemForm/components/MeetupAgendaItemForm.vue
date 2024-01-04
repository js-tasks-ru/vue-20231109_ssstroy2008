<template>
  <fieldset class="agenda-item-form">
    <button @click="$emit('remove')" type="button" class="agenda-item-form__remove-button">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="localAgendaItem.type"/>
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" v-model="localAgendaItem.startsAt"/>
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="localAgendaItem.endsAt"/>
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup 
        :label="localAgendaItem.type === 'talk' ? 'Тема' : 
        localAgendaItem.type === 'other' ? 'Заголовок' : 
        'Нестандартный текст (необязательно)'">
      <UiInput name="title" v-model="localAgendaItem.title"/>
    </UiFormGroup>
    <UiFormGroup 
        v-if="localAgendaItem.type === 'talk'" 
        label="Докладчик">
      <UiInput name="speaker" v-model="localAgendaItem.speaker" />
    </UiFormGroup>
    <UiFormGroup  
        v-if="localAgendaItem.type === 'talk' || 
        localAgendaItem.type === 'other'" 
        label="Описание">
      <UiInput multiline name="description" v-model="localAgendaItem.description" />
    </UiFormGroup>
    <UiFormGroup 
        v-if="localAgendaItem.type === 'talk'" 
        label="Язык">
      <UiDropdown title="Язык" :options="$options.talkLanguageOptions" name="language" v-model="localAgendaItem.language" />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      localAgendaItem: {...this.agendaItem},
      time: {
        start: null,
        end: null,
      },
    }
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        if (this.localAgendaItem.startsAt !== '00:00' && this.localAgendaItem.endsAt !== '00:00') {
          this.time.start = this.localAgendaItem.startsAt;
          this.time.end = this.localAgendaItem.endsAt;
        }
        this.$emit('update:agendaItem', {...this.localAgendaItem});
      }
    },


    'time.start': function (val, oldValue) {
      if (oldValue) {
        const hours = 24;
        let difference;
        let newValueStart = +Array.from(val).splice(0, 2).join('');
        let oldValueStart = +Array.from(oldValue).splice(0, 2).join('');
        let endValue = +Array.from(this.localAgendaItem.endsAt).splice(0, 2).join('');

        if (newValueStart > oldValueStart) {
          difference = newValueStart - oldValueStart;
          if (difference + endValue <= 9) {
            this.localAgendaItem.endsAt = `0${difference + endValue}:00`
          } else {
            this.localAgendaItem.endsAt = `${difference + endValue}:00`
          }
        }

      }
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
