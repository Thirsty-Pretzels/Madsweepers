// this test is written to test component boardOverview_grid.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import GridOverview from '../../src/components/boardOverview_grid'; 

let wrapper1;
let wrapper2;
let wrapper3;
let wrapper4;

describe('Test suite for GridOverview Component', () => {
  beforeEach(() => {
    // Prevent duplication
    wrapper1 = shallow(<GridOverview grid={{status: 0}} />);
    wrapper2 = shallow(<GridOverview grid={{status: 10}} />);
    wrapper3 = shallow(<GridOverview grid={{status: 11}} />);
    wrapper4 = shallow(<GridOverview grid={{status: 20}} />);
  });

  it('GriddOverview component should exist', () => {
    expect(wrapper1).to.exist;
    expect(wrapper2).to.exist;
    expect(wrapper3).to.exist;
    expect(wrapper4).to.exist;
  });

  it('GridOverview should be a div component and belongs to class "grid"', () => {
    expect(wrapper1.type()).to.equal('div');
    expect(wrapper1.hasClass('grid-overview')).to.equal(true);
    expect(wrapper2.type()).to.equal('div');
    expect(wrapper2.hasClass('grid-overview')).to.equal(true);
    expect(wrapper3.type()).to.equal('div');
    expect(wrapper3.hasClass('grid-overview')).to.equal(true);
    expect(wrapper4.type()).to.equal('div');
    expect(wrapper4.hasClass('grid-overview')).to.equal(true);
  });

  it('GridOverview should display an image wrapped under a parent div', () => {
    let img1 = wrapper1.childAt(0);
    expect(img1.type()).to.equal('img');
    let img2 = wrapper2.childAt(0);
    expect(img2.type()).to.equal('img');
    let img3 = wrapper3.childAt(0);
    expect(img3.type()).to.equal('img');
    let img4 = wrapper4.childAt(0);
    expect(img4.type()).to.equal('img');
  });

  it('The img children under GridOverview should belong to different classes according to their status', () => {
    let img1 = wrapper1.childAt(0);
    expect(img1.hasClass('grid-overview-0')).to.equal(true);
    let img2 = wrapper2.childAt(0);
    expect(img2.hasClass('grid-overview-10')).to.equal(true);
    let img3 = wrapper3.childAt(0);
    expect(img3.hasClass('grid-overview-11')).to.equal(true);
    let img4 = wrapper4.childAt(0);
    expect(img4.hasClass('grid-overview-1')).to.equal(true);
  });
});
