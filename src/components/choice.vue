<template>
  <span class="choice">
    <verbalization v-if="choice.verbalization" :id="choice.verbalization"></verbalization>
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
