import Vue from 'vue';
import Vuex from 'vuex';

import {Choice, Exchange, Verbalization} from 'lib';

function uid() {
  return Math.random().toString(32).slice(2);
}

const types = {
  activeChoices: 'activeChoices',
  addChoiceToExchange: 'addChoiceToExchange',
  addExchangeToChoice: 'addExchangeToChoice',
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
    [types.createChoice]({commit, dispatch}, exchange) {
      const verbalization = new Verbalization();
      const choice = new Choice(verbalization.id);

      commit(types.createVerbalization, verbalization);
      commit(types.createChoice, choice);
      commit(types.addChoiceToExchange, {exchange, choice});

      commit(types.activeChoices, {exchangeId: exchange.id, choiceId: choice.id});
    },
    [types.createExchange]({commit, dispatch}, parentChoice) {
      const v1 = new Verbalization();
      const v2 = new Verbalization();
      const c = new Choice(v1.id);
      const e = new Exchange(v2.id, c.id);

      commit(types.createVerbalization, v1);
      commit(types.createVerbalization, v2);
      commit(types.createChoice, c);
      commit(types.createExchange, e);

      if (parentChoice) {
        commit(types.addExchangeToChoice, {exchange, choice});
      }

      commit(types.activeChoices, {exchangeId: e.id, choiceId: c.id});
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
      state.activeChoices = {
        ...state.activeChoices,
        [exchangeId]: choiceId
      };
    },
    [types.addChoiceToExchange](state, {exchange, choice}) {
      state.exchanges[exchange.id].choices.push(choice.id);
    },
    [types.addExchangeToChoice](state, {exchange, choice}) {
      state.choices[choice.id].exchange = exchange.id;
    },
    [types.createChoice](state, choice) {
      state.choices = {
        ...state.choices,
        [choice.id]: choice
      };
    },
    [types.createExchange](state, exchange) {
      state.exchanges = {
        ...state.exchanges,
        [exchange.id]: exchange
      };
    },
    [types.createVerbalization](state, verbalization) {
      state.verbalizations = {
        ...state.verbalizations,
        [verbalization.id]: verbalization
      };
    },
    [types.editVerbalization](state, {id, text}) {
      state.verbalizations[id].text = text;
    },
    [types.npc](state, npc) {
      state.npc = npc;
    }
  },

  state: {
    activeChoices:{},
    choices: {},
    conversations: {},
    exchanges: {},
    verbalizations: {}
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
/*
Rough Draft 5, following Google Firebase's Data Structure recommendations:

const state = {
  // Exchanges contain only meta info about each exchange stored under the exchange's uid
  exchanges: {
    uidE1: {
      verbalization: 'uidV1',
      choices: {
        uidC1: true,
        uidC2: true,
      }
    }
  },

  // Choices are easily accessible and stored by exchange id
  choices: {
    uidE1: {
      uidC1: {
        verbalization: 'uidV2'
        exchange: 'uidE2'
      },
      uidC2: {
        verbalization: 'uidV3'
        exchange: 'uidE3'
      }
    },
    uidE2: {
      ...
    }
  },

  verbalizations: {
    uidE1: {
      uidV1: 'We are the UrQuan!',
      uidV2: 'Uh, ok.'
    },
    ...
  },

  activeExchanges: {
    uidE1: true
  }
}
*/
/*
0. When creating an Exchange, a choice and 2 Verbalizations also get created.
1. Start w/a Default Exchange & Choice & 2 Verbalizations. No second exchange. Has One Active Choice & one Active Exchange
2. Create 2nd Exchange

A choice SHOULD only active if its exchange is active... (This might be a bug in my current set up.)
Active Exchanges have active choices, and active choices activate exchanges.

1. An Active Exchange's Active Choice points to a) an empty exchange (create new / select existing) or b) the exchange
linked by the choice.

state = {
  conversation: {
    con1: {
      name: '',
      npc: ''
      timestamp: '',
    }
  }
  exchanges: {
    con1: {
      e1: {
        verbalization: 'v1',
        choices: {
          c1: true,
          ...
        }
      },
      ...
    }
  },
  choices: {
    con1: {
      e1: {
        c1: {
          verbalization: 'v2',
          exchange: 'e2'
        },
        ...
      },
      ...
    }
  },
  verbalizations: {
    con1: {
      v1: '',
      v2: '',
      ...
    }
  },
  activeChoices: {
    con1: {
      e1: 'c1',
      e2: 'c1',
    }
  }
};

 */
