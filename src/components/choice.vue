<template>
  <span class="choice">
    <verbalization v-if="choice.verbalization" :id="choice.verbalization"></verbalization>
    <div class="toolbox-hover-top">
      <button @click="createAnotherChoice">Create Another Choice</button>
      <select>
        <option v-for="choice in choices" :value="choice.id">{{choice.text}}</option>
      </select>
    </div>
  </span>
</template>
<script type="text/babel">
  import Verbalization from 'components/verbalization';
  import {mapState} from 'vuex';

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
      createAnotherChoice() {

      }
    },
    mounted() {
      if (!this.choice.verbalization) {
        this.$store.dipatch(types.createVerbalization, this.choice);
      }
    },
    props: [
      'id'
    ]
  };
</script>
<style>
  .choice {
    position: relative;
  }
  .toolbox-hover-top {
    display: none;
    left: 0;
    position: absolute;
    top: -1rem;
  }
</style>
