<template>
  <span class="verbalization" contenteditable="true" @keyup="updateStore">{{text}}</span>
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
    data() {
      return {
        text: this.$store.state.verbalizations.find(({id}) => id === this.id).text
      };
    },
    methods: {
      updateStore(event) {
        let {id} = this.verbalization;
        let text = event.target.textContent;
        this.$store.dispatch(types.editVerbalization, {id, text});
      }
    },
    mounted() {
      this.$el.focus();
      this.$watch('id', function() {
        this.text = this.$store.state.verbalizations.find(({id}) => id === this.id).text; // so why does this bomb when I move it to a computed...?
        this.$el.textContent = this.text; // hack the contenteditable
      });
    },
    name: 'verbalization',
    props: [
      'id'
    ]
  };
</script>
<style>
  .verbalization {
    color: #ddd;
    display: inline-block;
    line-height: 1.3rem;
    min-width: 3em;
  }
  .verbalization:focus {
    border-bottom: 1px dotted #42b983;
    outline: none;
  }
</style>
