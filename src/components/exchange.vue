<template>
  <div class="exchange">

    <div class="npc-verbalization-container">
      <label>{{npc || 'NPC'}}</label>
      <span v-if="!exchange || !exchange.verbalization" @click="onVerbalizationPlaceholderClick">Enter your line here...</span>
      <npc-verbalization v-if="exchange && exchange.verbalization" :id="exchange.verbalization"></npc-verbalization>
    </div>

    <div class="choice-container">
      <label>Player</label>
      <span v-if="!exchange.choices.length" @click="createChoice">Enter your line here...</span>

      <pc-choice v-if="activeChoice.id" :id="activeChoice.id"></pc-choice>

      <div class="toolbox-hover-top">
        <button @click="createChoice">Create Another Choice</button>
        <select :value="activeChoice.id" @change="activateChoice">
          <option v-for="choice in choices" :value="choice.id">{{ textFrom(choice.verbalization) }}</option>
        </select>
      </div>
    </div>

  </div>
</template>
<script type="text/babel">

  import NpcVerbalization from 'components/verbalization';
  import PcChoice from 'components/choice';

  import {mapActions, mapState} from 'vuex';
  import {types} from '../store';

  export default {
    components: {
      NpcVerbalization,
      PcChoice
    },
    computed: {
      ...mapState({
        activeChoice(state) {
          const activeChoice = state.activeChoices.find(({exchangeId}) => this.id);
          return activeChoice ? state.choices.find(({id}) => id === activeChoice.choiceId) : {};
        },
//        activeChoice(state) {
//          if (!this.activeChoiceId) {
//            return;
//          }
//          return state.choices.find(({id}) => id === this.activeChoiceId);
//        },
//        activeChoiceId(state) {
//          const currentChoice = state.activeChoices.find(({exchangeId}) => this.id);
//          return currentChoice ? currentChoice.choiceId : null;
//        },
        choices(state) {
          return state.choices.filter(({id}) => this.exchange.choices.includes(id))
        },
        exchange(state){
          return state.exchanges.find(({id}) => id === this.id);
        },
        npc: state => state.npc
      }),
    },
    methods: {
      activateChoice($event) {
        let exchangeId = this.exchange.id;
        let choiceId = $event.target.value;
        this.$store.dispatch(types.activeChoices, {exchangeId, choiceId});
      },
      onVerbalizationPlaceholderClick() {
        this.$store.dispatch(types.createVerbalization, this.exchange);
      },
      createChoice() {
        this.$store.dispatch(types.createChoice, this.exchange);
      },
      textFrom(verbalizationId) {
        return this.$store.state.verbalizations.find(item => item.id === verbalizationId).text;
      }
    },
    props: [
      'id'
    ],
  };
</script>
<style scoped>
  label {
    display: block;
    opacity: 0.5;
  }

  .choice-container {
    position: relative;
  }
  .toolbox-hover-top {
    // display: none;
    left: 0;
    position: absolute;
    top: -1rem;
  }
</style>
