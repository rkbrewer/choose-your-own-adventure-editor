<template>
  <div>
    <span class="choice">
      <verbalization v-if="choice.verbalization" :id="choice.verbalization" @change="onVerbalizationKeyup"></verbalization>
    </span>
    <span v-if="!choice.exchange" @click="createExchange">NPC: Enter your line here...</span>
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
      onVerbalizationKeyup(event) {
        if (event.keyCode === 9) {
          console.log('TAB! Create an exchange');
          this.createExchange();
        }
      }
    },
    mounted() {

    },
    props: [
      'id'
    ]
  };
</script>
