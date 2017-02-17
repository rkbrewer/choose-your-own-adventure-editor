<template>
  <div>
    <span class="choice">
      <verbalization v-if="choice.verbalization" :id="choice.verbalization"></verbalization>
      <button v-else @click="createVerbalization">Create Verbalization</button>
    </span>
    <button v-if="!choice.exchange" @click="createExchange">Create Exchange</button>
  </div>
</template>
<script type="text/babel">
  import Verbalization from 'components/verbalization';
  import {mapState} from 'vuex';
  import {types} from '../store';

  export default {
    components: {
      Verbalization
    },
    computed: {
      ...mapState({
        choice(state) {
          return state.choices.find(({id}) => id === this.id);
        },
      }),
    },
    methods: {
      createExchange() {
        if (!this.choice.exchange){
          this.$store.dispatch(types.createExchange, this.choice);
        }
      },
      createVerbalization() {
        this.$store.dispatch(types.createVerbalization, this.choice);
      }
    },
    props: [
      'id'
    ]
  };
</script>
