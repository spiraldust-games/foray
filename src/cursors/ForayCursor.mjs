/**
 * The class just tracks the internal cursor used inside `fn()`. Atoms can use
 * this to alter the inputs and outputs, and to decide when we should return.
 */
export default class ForayCursor {
  /**
   * @param {object} $0 - a params wrapper
   * @param {array} $0.atoms - the atoms being processed by `fn`
   * @param {array} $0.array - the array being worked on
   * @param {array} $0.entries - the entries calculated from array
   * @param {array} [$0.args=[]] - arguments passed into the runtime method
   * @param {array} [$0.outputs=[]] - the calculated outputs as we go
   */
  constructor({
    args = [], atoms, array, entries, outputs = [],
  }) {
    this.i = 0;
    this.item = null;
    this.args = args;
    this.atoms = atoms;
    this.array = array;
    this.entries = entries;
    this.outputs = outputs;
    this.outputStart = null;
    this.outputEnd = null;
    this.returnValue = undefined;
    this.stopped = false;
  }

  getArg(n = 0) {
    return this.args[n];
  }

  getPreviousOutput() {
    return this.outputs[this.i - 1] || undefined;
  }

  clearOutputsBefore(n = this.i) {
    this.outputs = this.outputs.slice(n, this.outputs.length);
  }

  clearOutputsAfter(n = this.i) {
    this.outputs.length = n;
  }

  setOutputStart(n = this.i) {
    this.outputStart = n;
  }

  setOutputEnd(n = this.i) {
    this.outputEnd = n;
  }

  getOutput(n = this.i) {
    return this.outputs[n];
  }

  setOutput(v, n = this.i) {
    this.outputs[n] = v;
  }

  stopAndReturn(returnValue) {
    this.returnValue = returnValue;
    this.stopped = true;
  }
}
