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
      }
    },
    methods: {
      updateStore(event) {
        let {id} = this.verbalization;
        let text = event.target.textContent;
        this.$store.dispatch(types.editVerbalization, {id, text});
      }
    },
    name: 'verbalization',
    props: [
      'id'
    ]
  };

  // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  // 48 - 90 are good, 96-111 are good, 186-192, and 219-222
  function allowed(code) {
    return (code > 47 && code < 91) || code > 95 && code < 112 || code > 185 && code < 193 || code > 218 && code < 223;
  }
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
