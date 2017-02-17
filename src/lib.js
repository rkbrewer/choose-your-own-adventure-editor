class Choice {
  constructor() {
    this.exchange = null; // child exchange
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
  constructor() {
    this.id = _uid();
    this.text = '';
  }
}

function _uid() {
  return Math.random().toString(32).slice(2);
}

export {Choice, Exchange, Verbalization};
