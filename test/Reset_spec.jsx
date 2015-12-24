import React from 'react/addons';
import {Reset} from '../src/components/Reset';
import {expect} from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} = React.addons.TestUtils;

describe('Reset', () => {

  it('Renders one button', () => {
    const component = renderIntoDocument(
      <Reset />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(1);
  });

  it('Calls resetGrid callback when the button is clicked', () => {
    let result,
        resetGrid = function() {
          result = 'test passed';
        };
    const component = renderIntoDocument(
      <Reset resetGrid={resetGrid} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);
    expect(result).to.equal('test passed');
  });

});
