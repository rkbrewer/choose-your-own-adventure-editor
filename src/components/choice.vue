<template>
  <span class="choice">
    <verbalization></verbalization>
    <div class="toolbox-hover-top">
      <button @click="createChoice">New Choice</button>
      <select>
        <option v-for="choice in choices" :value="choice.id">{{choice.text}}</option>
      </select>
    </div>
  </span>
</template>
<script type="text/babel">
  import Verbalization from 'components/verbalization';

  export default {
    components: {
      Verbalization
    },
    data() {
      return {
        choices: [],
        choice: '',
      };
    },
    methods: {
      createChoice() {
        // this.choices.push(new Utterance());
      }
    },
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
