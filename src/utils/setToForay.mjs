import foraySymbol from '../enums/foraySymbol.mjs';

const setToForay = (forayContainer, value) => {
  forayContainer[foraySymbol] = value;
};

export default setToForay;
