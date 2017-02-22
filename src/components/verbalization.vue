<template>
  <input type="text" class="verbalization" @keyup="updateStore" :value="verbalization.text" />
</template>
<script type="text/babel">
  import {mapState} from 'vuex';
  import {types} from '../store';

  export default {
    computed: {
      ...mapState({
        verbalization(state) {
          return state.verbalizations.find(({id}) => id === this.id);
        }
      }),
    },
    methods: {
      updateStore(event) {
        const text = event.target.value;
        this.$store.dispatch(types.editVerbalization, {id: this.id, text});
      }
    },
    name: 'verbalization',
    props: [
      'id'
    ]
  };
</script>
