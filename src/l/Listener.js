import clone from '../utils/clone';

export default class Listener {
  /**
   * @param {Component} component
   * @param {...string} path
   */
  constructor(component, ...path) {
    this.component = component;
    this.key = path[path.length - 1];
    this.childPath = path.slice(0, path.length - 1);
    this.value = null;
    this.changeListeners = [];
    this.processValue = value => value;

    this.component.addListener(this.key, this);
    this.handleUpdate(this.component[this.key]);
  }

  /**
   * @param {*} value
   */
  handleUpdate(value) {
    this.value = this.processValue(this.getShallowValue(value), this.value);
    for (const changeListener of this.changeListeners) {
      changeListener(this.value);
    }
  }

  /**
   * @param {function(*)} changeListener
   */
  onValueChange(changeListener) {
    this.changeListeners.push(changeListener);
    changeListener(this.value);
  }

  clearChangeCallbacks() {
    this.changeListeners = [];
  }

  /**
   * @param {function(*): *} processValue
   * @returns {function(*): *}
   */
  process(processValue) {
    this.processValue = processValue;
    this.handleUpdate(this.value);
    return this;
  }

  /**
   * @private
   * @param {*} value
   */
  getShallowValue(value) {
    let shallowValue = value;
    if (!this.childPath) return value;
    for (const pathNestingLevel of this.childPath) {
      shallowValue = shallowValue[pathNestingLevel];
    }
    return shallowValue;
  }
}
