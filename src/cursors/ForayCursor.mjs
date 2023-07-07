/**
 * The class just tracks the internal cursor used inside `fn()`. Atoms can use
 * this to alter the inputs and outputs, and to decide when we should return.
 */
export default class ForayCursor {
  /**
   * @param {object} params - a params wrapper
   * @param {array} params.atoms - the atoms being processed by `fn`
   * @param {array} params.array - the array being worked on
   * @param {array} params.entries - the entries calculated from array
   * @param {array} [params.args=[]] - arguments passed into the runtime method
   * @param {array} [params.outputs=[]] - the calculated outputs as we go
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

  /**
   * get an argument that was defined by the method that created the cursor
   * in most cases these are the arguments that have been passed into the
   * foray method.
   * @param {number} [n=0] - controls which argument offset to use, 0 by default
   */
  getArg(n = 0) {
    return this.args[n];
  }

  /**
   * A core functionality of the cursor, secondary to keeping track of where
   * we are in the array, is to track outputs. This is a convenience method for
   * getting hold of the last set output.
   */
  getPreviousOutput() {
    return this.outputs[this.i - 1] || undefined;
  }

  /**
   * Manipulate outputs, by clearing out the outputs before an `n` position.
   * By default we operate from the current cursor position.
   * @param {number} [n=this.i]
   */
  clearOutputsBefore(n = this.i) {
    this.outputs = this.outputs.slice(n, this.outputs.length);
  }

  /**
   * Manipulate outputs, by clearing out the outputs after an `n` position.
   * By default we operate from the current cursor position.
   * @param {number} [n=this.i]
   */
  clearOutputsAfter(n = this.i) {
    this.outputs.length = n;
  }

  /**
   * Allows to defer when we run clearOutputsBefore. When outputStart has been
   * set, after we complete a pass through of the array items, we then trigger
   * `cursor.clearOutputsBefore(this.outputStart)`.
   * @param {number} [n=this.i]
   */
  setOutputStart(n = this.i) {
    this.outputStart = n;
  }

  /**
   * Allows to defer when we run clearOutputsAfter. When outputEnd has been
   * set, after we complete a pass through of the array items, we then trigger
   * `cursor.clearOutputsAfter(this.outputEnd)`.
   * @param {number} [n=this.i]
   */
  setOutputEnd(n = this.i) {
    this.outputEnd = n;
  }

  /**
   * A core functionality of the cursor, secondary to keeping track of where
   * we are in the array, is to track outputs. Here we can retrieve a specific
   * output at a particular offset. You would use this function to get an
   * output that has been set by a previous hook or atom.
   * @param {number} [n=this.i]
   */
  getOutput(n = this.i) {
    return this.outputs[n];
  }

  /**
   * A core functionality of the cursor, secondary to keeping track of where
   * we are in the array, is to track outputs. Here we can set a specific output
   * at a particular offset. You would use this function to set a particular
   * output that may then be used as a input in a later running hook or atom.
   * @param {number} [n=this.i]
   */
  setOutput(v, n = this.i) {
    this.outputs[n] = v;
  }

  /**
   * Outputs are used as intermediary stores that can be accessed by the
   * individual hooks and atoms that make up a method. However, they do not
   * control the final output of the running method. To control this, you must
   * set the returnValue. This function is a convenience method for doing that.
   * @param {*} returnValue
   */
  setReturnValue(returnValue) {
    this.returnValue = returnValue;
  }

  /**
   * Another convenience method, this time, to essentially stop the running
   * method and force a return value.
   * @param {*} returnValue
   */
  stopAndReturn(returnValue) {
    this.setReturnValue(returnValue);
    this.stopped = true;
  }
}
