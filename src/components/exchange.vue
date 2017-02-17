<template>
  <div class="exchange">

    <div class="npc-verbalization-container">
      <label>{{npc || 'NPC'}}</label>
      <button v-if="!exchange || !exchange.verbalization" @click="createNpcVerbalization">Create NPC Line</button>
      <verbalization v-if="exchange && exchange.verbalization" :id="exchange.verbalization"></verbalization>
    </div>

    <div class="choice-container">
      <label>Player</label>
      <button v-if="!exchange.choices.length" @click="createChoice">Create Player Choice</button>

      <choice v-if="activeChoice.id" :id="activeChoice.id"></choice>

      <div class="toolbox-hover-top">
        <button @click="createChoice" v-if="exchange.choices.length === 1">Create Another Choice</button>
        <select v-if="choices.length > 1" :value="activeChoice.id" @change="activateChoice">
          <option v-for="choice in choices" :value="choice.id">{{ textFrom(choice.verbalization) }}</option>
        </select>
      </div>
    </div>

  </div>
</template>
<script type="text/babel">

  import Verbalization from 'components/verbalization';
  import Choice from 'components/choice';

  import {mapActions, mapState} from 'vuex';
  import {types} from '../store';

  export default {
    components: {
      Verbalization,
      Choice
    },
    computed: {
      ...mapState({
        activeChoice(state) {
          const activeChoice = state.activeChoices.find(({exchangeId}) => this.id);
          return activeChoice ? this.choices.find(({id}) => id === activeChoice.choiceId) : {};
        },
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
      createNpcVerbalization() {
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
