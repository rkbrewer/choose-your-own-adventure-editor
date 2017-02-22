<template>
  <div class="exchange">

    <fieldset class="form-items">
      <div class="form-item">
        <label>{{npc || 'NPC'}}</label>
        <verbalization v-if="exchange && exchange.verbalization" :id="exchange.verbalization"></verbalization>
      </div>

      <div class="choice-container">
        <div v-if="activeChoice" class="form-item choice-form-item">
          <label>Player</label>
          <verbalization v-if="activeChoice" :id="activeChoice.verbalization"></verbalization>
        </div>
        <div class="choice-toolbox">
          <button @click="createChoice" v-if="exchange.choices.length > 0">Create Another Choice</button>
          <select v-if="choices.length > 1" :value="activeChoice.id" @change="activateChoice">
            <option v-for="choice in choices" :value="choice.id">{{ textFrom(choice.verbalization) }}</option>
          </select>
        </div>
      </div>
    </fieldset>

    <div v-if="!activeChoice.exchange" class="next-exchange">
      <button @click="createExchange">Create Exchange</button>
      <select>
        <option>Link To Existing Exchange</option>
      </select>
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
          const activeChoice = state.activeChoices.find(({exchangeId}) => exchangeId === this.id);
          return this.choices.find(({id}) => activeChoice.choiceId === id);
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
      createChoice() {
        this.$store.dispatch(types.createChoice, this.exchange);
      },
      createExchange() {
        this.$store.dispatch(types.createExchange, this.activeChoice);
      },
      textFrom(verbalizationId) {
        const v = this.$store.state.verbalizations.find(item => item.id === verbalizationId);
        if (!v) return;
        return v.text;
      }
    },
    props: [
      'id'
    ],
  };
</script>
<style>
  .form-items {

  }
  .choice-container > * {
    display: inline-block;
  }
  .next-exchange {
    padding: 2rem 0;
    text-align: center;
    border: 1px solid rgba(255,255,255, 0.3);
  }
</style>
