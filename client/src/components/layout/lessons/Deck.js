export default class Deck {
  constructor(Flashcards) {
    this.Flashcards = Flashcards;
    this.batch = this.getBatch();
    this.currentIndex = 0;
    this.passed = 0;
    this.remaining = Flashcards.length;
    this.batchCount = 0;
  }

  getBatch(i = 0, batchSize = 5) {
    let start = i * batchSize;
    let end = i * batchSize + batchSize;
    if (end > this.Flashcards.length) end = this.Flashcards.length;
    const batch = this.Flashcards.slice(start, end);
    console.log("BATCH:", batch);
    console.log("I", i);
    console.log("Flashcards len", this.Flashcards.length);
    return batch;
  }

  getCurrent() {
    return this.batch[this.currentIndex];
  }

  setCurrent(id = 0) {
    this.currentIndex = id;
  }

  nextBatch() {
    this.batchCount += 1;
    if (this.batchCount * 5 >= this.Flashcards.length) {
      return false;
    }
    this.batch = this.getBatch(this.batchCount);
    console.log("BATCH:", this.batch);
    return this.batch;
  }

  passCurrent() {
    this.passed += 1;
  }

  isNext() {
    const nextInfo = this.getCurrent().isNext();
    const isNotOverboard = this.currentIndex < this.batch.length - 1;

    if (nextInfo) {
      return true;
    } else if (isNotOverboard) {
      return true;
    } else if (!isNotOverboard) {
      return false;
    }
  }

  next() {
    const nextInfo = this.getCurrent().next();
    const isNotOverboard = this.currentIndex < this.batch.length - 1;

    if (nextInfo) {
      return true;
    } else if (isNotOverboard) {
      this.currentIndex += 1;
      return true;
    } else if (!isNotOverboard) {
      return false;
    }
  }

  previous() {
    if (!this.getCurrent().previous() && this.currentIndex > 0)
      this.currentIndex -= 1;
  }
}
