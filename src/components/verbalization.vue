<template>
  <span class="verbalization" contenteditable="true" @keyup="updateLine">{{verbalization.text}}</span>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        verbalization: {},
      };
    },
    methods: {
      updateLine(event) {
        this.verbalization.text += event.key;
      }
    },
    name: 'verbalization'
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
