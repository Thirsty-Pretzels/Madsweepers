// this test is written to test component boardOverview_grid.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Row from '../../src/components/board_row'; 
import Grid from '../../src/components/board_grid';
import GridOverview from '../../src/components/boardOverview_grid';

let wrapper1;
let wrapper2;
let rowData = [
  {status: 0, val: 1},
  {status: 1, val: 2},
  {status: 2, val: 3},
  {status: 3, val: 0},
  {status: 1, val: 0},
  {status: 2, val: 9}
]; 

describe('Test suite for Row component', () => {
  beforeEach(() => {
    // Prevent duplication
    wrapper1 = shallow(<Row row={rowData} />);
    wrapper2 = shallow(<Row row={rowData} overView={true}/>);
  });

  it('Row component should exist', () => {
    expect(wrapper1).to.exist;
    expect(wrapper2).to.exist;
  });
  
  it('Row should be a div component', () => {
    expect(wrapper1.type()).to.equal('div');
    expect(wrapper2.type()).to.equal('div');
  });

  it('The props(overView) passed from parent would decide whether row should belongs to Class "rowOverview"', () => {
    expect(wrapper1.hasClass('rowOverview')).to.equal(false);
    expect(wrapper2.hasClass('rowOverview')).to.equal(true);
  }); 

  it('If props(overView) is false or undefined, All of the Children of Row should be Grid', () => {
    // console.log(wrapper1.childAt(0));
    // console.log(wrapper1.childAt(0).node.type);
    for(var i = 0; i < wrapper1.children().length; i++) {
      // expect(wrapper1.childAt(i).contains(<Grid />)).to.equal(true);
      // expect(wrapper1.childAt(i) instanceof Grid).to.equal(true);
      expect(wrapper1.childAt(i).node.type).to.equal(Function: Grid);
    }
  });

  it('If props(overView) is false or undefined, All of the Children of Row should be GridOverview', () => {
    for(var i = 0; i < wrapper1.children().length; i++) {
      expect(wrapper1.childAt(i).contains(<GridOverview />)).to.equal(true);
    }
  });

});