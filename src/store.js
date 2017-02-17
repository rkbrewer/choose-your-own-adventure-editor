import Vue from 'vue';
import Vuex from 'vuex';

import {Choice, Exchange, Verbalization} from 'lib';

const types = {
  activeChoices: 'activeChoices',
  createChoice: 'createChoice',
  createExchange: 'createExchange',
  createVerbalization: 'createVerbalization',
  editVerbalization: 'editVerbalization',
  npc: 'npc'
};

Vue.use(Vuex);
const store = new Vuex.Store({
  actions: {
    [types.activeChoices]({commit}, {exchangeId, choiceId}) {
      commit(types.activeChoices, {exchangeId, choiceId});
    },
    [types.createChoice]({commit}, exchange) {
      const choice = new Choice();
      exchange.choices.push(choice.id); // turn this into an action
      commit(types.createChoice, choice);
      commit(types.activeChoices, {exchangeId: exchange.id, choiceId: choice.id});
    },
    [types.createExchange]({commit}, choice) {
      const exchange = new Exchange();
      // turn this IF into an action
      if (choice) {
        choice.exchange = exchange.id;
      }
      commit(types.createExchange, exchange);
    },
    [types.createVerbalization]({commit}, item) {
      const verbalization = new Verbalization();
      item.verbalization = verbalization.id;
      commit(types.createVerbalization, verbalization);
    },
    [types.editVerbalization]({commit}, {id, text}) {
      commit(types.editVerbalization, {id, text});
    },
    [types.npc]({commit}, event) {
      commit(types.npc, event.target.value);
    },
  },

  mutations: {
    [types.activeChoices](state, {exchangeId, choiceId}) {
      // Swap out the old with the new
      state.activeChoices = state.activeChoices.filter(item => item.exchangeId !== exchangeId);
      state.activeChoices.push({exchangeId, choiceId});
    },
    [types.createChoice](state, choice) {
      state.choices.push(choice);
    },
    [types.createExchange](state, exchange) {
      state.exchanges.push(exchange);
    },
    [types.createVerbalization](state, verbalization) {
      state.verbalizations.push(verbalization);
    },
    [types.editVerbalization](state, {id, text}) {
      state.verbalizations.find(item => item.id === id).text = text;
    },
    [types.npc](state, npc) {
      state.npc = npc;
    }
  },

  state: {
    activeChoices:[],
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
  choices: [{id: 1, verbalization: 2, exchange: 2}, ...{}], // NOTE: this exchange is not its owner, but rather the one it leads to. There is not a 2 way binding here, like parentExchange. I could add 2-way relationship of parentExchange/childExchange(s)...
  verbalizations: [
    {id: 1, text: 'Who goes there?'},
    {id: 2, text: 'Me.'},
    {id: 3, text: 'Not me.'}
  ],
  // the "glue" that allows a conversation to be fully rendered. Active choices are NOT persisted, but here just for the UI.
  activeChoices: []
};

/*
Most basic implementation:
1. Auto-create nothing, let everything have a button
2. Once built, load in normalized data.

// NORMALIZED DATA:
exchanges = {
  '1': {
    verbalization: 2,
    choices: [3, 4]
  },
  '6': {
    verbalization: 7,
    choices: [8]
  }
},
choices: {
  '3': {
    verbalization: 5,
    exchange: 6
  },
  '8': {
    verbalization: 9
    exchange: null
  }
}
verbalization: {
  '2': { text: 'hi' },
  '5': { text: 'do you like my hat?' }
  '7': { text: 'hello' },
  '9': { text: 'I do not.' }
}

 */
/*
BUG
1. create a 2nd exchange
2. see the new exchange's choice have a verbalization state set to the first exchange's choice's verbalization.
3. Vuex looks correct

Hypothesis:
Odd rendering bug because I'm adding objects to vuex? Instead of flat observables?

The component devtools looks off:
The 2nd exchange has a choice component, but I never explicitly created it.
It's also showing the buttons to create a choice, which should only render if !exchange.choices.length
 */
