<template>
  <div class="form-item choice-form-item">
    <label>Player</label>
    <verbalization v-if="choice.verbalization" :id="choice.verbalization"></verbalization>
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
    props: [
      'id'
    ]
  };
</script>
