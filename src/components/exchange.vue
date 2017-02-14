<template>
  <div class="exchange">
    <div>
      <label>{{npc}}</label>
      <span v-if="!exchange || !exchange.verbalization" @click="onVerbalizationPlaceholderClick">Enter your line here...</span>
      <npc-verbalization v-if="exchange && exchange.verbalization" :id="exchange.verbalization"></npc-verbalization>
    </div>
    <div>
      <label>Player</label>
      <span v-if="!exchange || !exchange.choice" @click="onChoicePlaceholderClick">Enter your line here...</span>
      <pc-choice v-if="exchange && exchange.choice" :id="exchange.choice"></pc-choice>
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
        exchange(state){
          return state.exchanges.find(({id}) => id === this.id);
        },
        npc: state => state.npc
      }),
    },
    methods: {
      onVerbalizationPlaceholderClick() {
        this.$store.dispatch(types.createVerbalization, this.exchange);
      },
      onChoicePlaceholderClick() {
        this.$store.dispatch(types.createChoice, this.exchange);
      }
    },
    props: [
      'id'
    ],
  };
</script>
