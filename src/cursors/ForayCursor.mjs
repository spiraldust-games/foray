/**
 * The class just tracks the internal cursor used inside fn(). Atoms can use
 * this to alter the inputs and outputs, and to decide when we should return.
 */
export default class ForayCursor {
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
