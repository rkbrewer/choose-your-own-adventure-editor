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
        <input type="text" v-model="npc">
      </div>
    </section>

    <section>
      <template><!-- exchange -->
        <div>
          <label>{{npc}}</label>
          <npc-verbalization></npc-verbalization>
        </div>
        <div>
          <label>Player</label>
          <pc-choice></pc-choice>
        </div>
      </template>
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
  Anatomy of a Script: http://www.shortlist.com/entertainment/films/the-anatomy-of-a-film-script
   */
  import NpcVerbalization from 'components/verbalization';
  import PcChoice from 'components/choice';

  export default {
    components: {
      NpcVerbalization,
      PcChoice
    },
    data () {
      return {
        npc: '',
        title: '',
      };
    },
    name: 'editor'
  }
</script>

<style>
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
