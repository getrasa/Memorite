export default class Flashcards {
  constructor(flashcards) {
    this.flashcards = flashcards;
    this.queue = setQueue(flashcards);
    this.current = this.getFirst();
    this.failed = [];
    this.length = flashcards.length;
    this.correct = 0;
    this.percentage = 100;
    this.remaining = flashcards.length;
  }

  getFirst() {
    return this.queue.pop();
  }

  next() {
    if (this.queue) {
      this.current = this.queue.pop();
      return this.current;
    }
    return false;
  }

  check(input) {
    const correct = this.current.meaning
      ? this.current.meaning
      : this.current.reading;

    for (let word of correct) {
      word = word.toUpperCase();
      input = input.toUpperCase();

      if (word == input) {
        return true;
      }
    }
    return false;
  }

  failCurrent() {
    this.failed.push(this.current);
  }

  isCurrentInQueue() {
    return this.queue.find(x => x.term === this.current.term) ? true : false;
  }

  hasCurrentFailed() {
    return this.failed.find(x => x.term === this.current.term) ? true : false;
  }

  returnCurrentToQueue() {
    insertRandomly(this.queue, this.current);
  }

  updatePercentage() {
    this.percentage = Math.floor(
      ((this.remaining + this.correct) / this.length) * 100
    );
  }

  getFullFlashcard() {
    return this.flashcards.find(x => x.term === this.current.term);
  }
}

const setQueue = flashcards => {
  console.log("FLASHCARDS.JS:", flashcards);
  const queue = [];
  for (var i = 0; i < flashcards.length; i++) {
    const flashcard = flashcards[i];
    const meaning = Object.assign({}, flashcard);
    delete meaning.reading;
    insertRandomly(queue, meaning);

    if (flashcard.reading.length !== 0) {
      const reading = Object.assign({}, flashcard);
      delete reading.meaning;
      insertRandomly(queue, reading);
    }
  }
  console.log("Queue:", queue);
  return queue;
};

const insertRandomly = (array, item) => {
  const randomIndex = Math.floor(Math.random() * (array.length - 0)) + 0;
  array.splice(randomIndex, 0, item);
  return array;
};
