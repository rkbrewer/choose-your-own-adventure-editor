<template>
  <div class="editor">
    <h1>Conversation Editor</h1>
    <fieldset class="form-items">
      <div class="form-item">
        <label>Title: </label>
        <input type="text" v-model="title">
      </div>
      <div class="form-item">
        <label>NPC: </label>
        <input type="text" :value="npc" @change="updateNpc">
      </div>
    </fieldset>

    <section>
      <exchange v-if="activeExchanges.length" v-for="exchange in activeExchanges" :id="exchange.id" class="block"></exchange>
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
        this.$store.dispatch(types.createExchange)
      }
    },
    name: 'editor'
  }
</script>

<style>
  .editor {
    margin-top: 2em;
    max-width: 70%;
    margin-left:200px;
    border: 1px solid rgba(255,255,255, 0.3);
  }
  .form-items {
    border: 1px solid rgba(255,255,255, 0.3);
  }
  .form-item label,
  .form-item input,
  .form-item textarea {
    font-size: 12px;
    color: #aaa;
  }
  .form-item label {
    width: 3em;
    display: inline-block;
  }
  .form-item input {
    background: rgba(255,255,255, 0.1);
    border: 1px solid rgba(255,255,255, 0.3);
    border-radius: 2px;
  }
</style>
