class Choice {
  constructor(verbalizationId) {
    this.exchange = null; // child exchange
    this.id = _uid();
    this.verbalization = verbalizationId;
  }
}

class Exchange {
  constructor(verbalizationId, choiceId) {
    this.choices = [choiceId];
    this.id = _uid();
    this.verbalization = verbalizationId;
  }
}

class Verbalization {
  constructor() {
    this.id = _uid();
    this.text = '';
  }
}

function _uid() {
  return Math.random().toString(32).slice(2);
}

export {Choice, Exchange, Verbalization};
