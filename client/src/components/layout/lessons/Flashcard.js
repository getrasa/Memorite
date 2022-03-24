export default class Flashcard {
  constructor({ _id, term, meaning, reading, definition, interval, level }) {
    this._id = _id;
    this.term = term;
    this.meaning = meaning;
    this.reading = reading || "None";
    this.definition = definition || "None";
    this.interval = interval;
    this.level = level;

    this.infoArray = [this.term, this.meaning, this.reading, this.definition];
    this.infoDescription = ["Term", "Meaning", "Reading", "Definition"];
    this.infoIndex = 0;
  }

  getCurrentInfo() {
    return this.infoArray[this.infoIndex];
  }

  setCurrentInfo(id) {
    this.infoIndex = id;
  }

  getCurrentInfoDescription() {
    return this.infoDescription[this.infoIndex];
  }

  getFullFlashcard() {
    return this;
  }

  next() {
    if (this.infoIndex < this.infoArray.length - 1) {
      this.infoIndex += 1;
      return true;
    }
    return false;
  }

  isNext() {
    if (this.infoIndex < this.infoArray.length - 1) {
      return true;
    }
    return false;
  }

  previous() {
    if (this.infoIndex > 0) {
      this.infoIndex -= 1;
      return true;
    }
    return false;
  }
}
