class Choice {
  constructor() {
    this.exchange = null;
    this.id = _uid();
    this.verbalization = null;
  }
}

class Exchange {
  constructor() {
    this.choices = [];
    this.id = _uid();
    this.verbalization = null;
  }
}

class Verbalization {
  constructor(text) {
    this.id = _uid();
    this.text = text || '';
  }
}

function _uid() {
  return Math.random().toString(32).slice(2);
}

export {Choice, Exchange, Verbalization};
