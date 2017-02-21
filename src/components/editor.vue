<template>
  <div class="editor">
    <h1>Conversation Editor</h1>
    <section class="meta-block">
      <div class="meta-field">
        <label>Title: </label>
        <input type="text" v-model="title">
      </div>
      <div class="meta-field">
        <label>NPC: </label>
        <input type="text" :value="npc" @change="updateNpc">
      </div>
    </section>

    <section>
      <exchange v-if="activeExchanges.length" v-for="exchange in activeExchanges" :id="exchange.id"></exchange>
      <aside>
        <!-- conversation tree diagram. allows you to click to form relationships? -->
      </aside>
    </section>
  </div>
</template>

<script>
  /*
  - Anatomy of a Script: http://www.shortlist.com/entertainment/films/the-anatomy-of-a-film-script
  ----------
  - An Exchange is a Verbalization that has one-to-manyChoice(s).
  - A Choice is a Verbalization that has one Exchange.
   */
  import Exchange from 'components/exchange';

  import {mapActions, mapState} from 'vuex';
  import {types} from '../store';

  export default {
    components: {
      Exchange,
    },
    computed: {
      ...mapState({
        activeExchanges(state) {
          if (!state.activeChoices.length) {
            return [];
          }
          return state.activeChoices
            .map(({exchangeId}) => state.exchanges.find(({id}) => id === exchangeId));
        },
        exchanges: state => state.exchanges,
        npc: state => state.npc,
      })
    },
    data() {
      return {
        title: ''
      };
    },
    methods: {
      ...mapActions({
        updateNpc: types.npc
      }),
    },
    mounted() {
      if (!this.exchanges.length) {
//        this.$store.dispatch(types.createExchange).then(exchange => {
//          this.$store.dispatch(types.createChoice, exchange);
//        });
        // TODO to fix the issue, let createExchange actions also create a choice... which will leads to that choice being active, which leads to the exchange being rendered.
        this.$store.dispatch(types.createExchange)
      }

    },
    name: 'editor'
  }
</script>

<style>
  .editor {
    margin-top: 2em;
  }
  .meta-block {
    margin-bottom: 3rem;
  }
  .meta-field {
    color: #aaa;
    display: inline-block;
    margin: 0 3rem;
  }
  input {
    background: none;
    border: none;
    border-bottom: 2px solid #297452;
    color: #ddd;
    padding: 0.5rem;
  }
  input:focus {
    outline: none;
  }
</style>
