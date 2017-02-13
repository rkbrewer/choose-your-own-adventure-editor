import Vue from 'vue';
import Vuex from 'vuex';

import {Choice, Exchange, Verbalization} from 'lib';

const types = {
  createChoice: 'addChoice',
  createExchange: 'addExchange',
  editVerbalization: 'editVerbalization',
  npc: 'npc'
};

Vue.use(Vuex);
const store = new Vuex.Store({
  actions: {
    [types.createChoice]({commit, state}) {
      commit(types.createChoice, new Choice());
    },
    [types.createExchange]({commit}) {
      commit(types.createExchange, new Exchange());
    },
    [types.editVerbalization]({commit, state}, text) {

    },
    [types.editPcChoice]({commit, state}, text) {
      let verbalization = state.currentExchange.filter(v => v.id === state.currentVerbalization);
      verbalization.text = text;
    },
    [types.npc]({commit}, npc) {
      commit(types.npc, npc);
    },
  },

  mutations: {
    [types.createChoice](state, choice) {
      state.choices.push(choice);
    },
    [types.createExchange](state, exchange) {
      state.exchanges.push(exchange);
    },
    [types.editVerbalization](state, id, text) {
      state.verbalizations.filter[id][0].text = text;
    },
    [types.npc](state, npc) {
      state.npc = npc;
    }
  },

  state: {
    choices: [],
    exchanges: [],
    npc: '',
    verbalizations: []
  }
});

export {types, store};

const conversationRoughDraft = {
  exchanges: [
    {
      id: 1,
      verbalization: {id: 1, text: ''},
      choices: [
        {
          id: 1,
          text:'',
          exchanges: [

          ]
        }
      ]
    }
  ]
};

const conversationRoughDraft2 = {
  exchange: {
    id: 1,
    verbalization: {id: 1, text: 'Of which do you choose?'},
    choices: [
      {
        id: 2,
        text:'This!',
        exchange: {
          id: 2,
          verbalization: {id : 2, text: 'Done!!'}
          // This could get hairy fast, if the idea is to let the document be nested but at the same time allow references.
          // Would I move an exchange in the JSON? If so how would I determine which one? Let an Exchange be an object or a number.
          // Why nest? For speed?
          // Take an example of parsing to find an exchange. In a nested tree,
          // the parser would have to drill into many leaves to find something, whereas
          // a flat structure is easier to search.
          // A nested structure gives history, but is that necessary? Maybe. It would be easier
          // to track history in a nested tree, since one could hop up the parent nodes.
        }
      },
      {
        id: 3,
        text: 'That!',
        exchange: 2
      }
    ]
  }
};

const roughDraft3 = {
  exchanges: [
    {
      id: 1,
      verbalization: {id: 1, text: 'Who goes there?'},
      choices: [1, 2]
    }
  ],
  choices: [
    {
      id: 1,
      verbalization: {id: 2, text: 'Me.'}
    },
    {
      id: 2,
      verbalization: {id: 3, text: 'Not me.'}
    }
  ]
};

// Go with this one. It's easier to code against.
/*
As a user, push a button to add a choice to start writing on.
As I type, I see a button I can push to create an exchange to tie to this choice. This means
when I create a choice, I don't immediately have to create a consequential exchange. I can do this after I'm done typing.
Once a choice has text in it, the UI should always show the 'New Consequence' button.

Same for Exchanges:
The UI initializes with one Exchange & one Choice (tied to that exchange), both of which have empty verbalizations (you just see the labels).
As I type an npc's verbalization, nothing happens on screen (behind the scenes it's vuex-updating);
I then type into the choice verbalization and a New Consequence button appears.
  (TODO If I click this do I make a new Exchange+Choice? Or just new Exchange?)
But for now I ignore the New Consequence button because I want to make another Choice.
  (TODO do I look up to the npc's verbalization and see an Add Another Choice button? Or do I look to where I'm writing?)
 */
// Does creating a new Choice create a new Exchange? No. Because a Choice could point to an existing Exchange.
// Push a button to createChoice, then immediately setConsequentialExchange or createExchange (which then automatically sets this as the conesequential exchange)
const roughDraft4 = {
  exchanges: [{id: 1, verbalization: 1, choices: [1,2]}, ...{}],
  choices: [{id: 1, verbalization: 2, exchange: 2}, ...{}],
  verbalizations: [
    {id: 1, text: 'Who goes there?'},
    {id: 2, text: 'Me.'},
    {id: 3, text: 'Not me.'}
  ],
  // the "glue" that allows a conversation to be fully rendered. Active choices are NOT persisted, but here just for the UI.
  activeChoices: [1,2]
};

const exchangeComponent = {
  props: ['id'],
  computed: {
    exchange: state => state.exchanges.filter[this.id][0]
  },
};

const choiceComponent = {
  props: ['id'],
  computed: {
    choice: state => state.choices.filter[this.id][0]
  },
};

const verbalizationComponent = {
  props: ['id'],
  computed: {
    verbalization: state => state.verbalizations.filter[this.id][0]
  },
  template: `<span>{{verbalization.text}}</span>`
};