<template>
  <div class="exchange">
    <div>
      <label>{{npc}}</label>
      <npc-verbalization></npc-verbalization>
    </div>
    <div>
      <label>Player</label>
      <pc-choice></pc-choice>
    </div>
  </div>
</template>
<script type="text/babel">

  import NpcVerbalization from 'components/verbalization';
  import PcChoice from 'components/choice';

  import {mapState} from 'vuex';

  export default {
    components: {
      NpcVerbalization,
      PcChoice
    },
    computed: {
      ...mapState({
        npc: state.npc
      })
    }
  };
</script>
