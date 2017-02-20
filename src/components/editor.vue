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
      <!-- TODO rebind to iterate over exchange in activeExchanges -->
      <exchange v-for="exchange in exchanges" :id="exchange.id"></exchange>
      <aside>
        <!-- conversation tree diagram. allows you to click to form relationships? -->
      </aside>
    </section>
  </div>
</template>

<script>
  /*
  - In this abstraction, an NPC has Lines, a PC has Choices.
  - Given whoever starts one of two Template-Blocks is rendered: <line><choice> or <choice><line>
  - This Template-Block is repeated for however many lines the author creates FOR THE THREAD.
  - For each template-block, a Lines or Choice is allowed to be empty (but never both).
  ----------
  - If empty blocks are allowable, I can kill the Starts With [PC|NPC] selector, and just use a blank.
  - lines and choices need id's, utterance
  ----------
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
          // Follow the line down all active choices of exchanges and choices, defaulting to the first choice if nothing's active.
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
        this.$store.dispatch(types.createExchange);
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
