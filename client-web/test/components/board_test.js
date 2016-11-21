// this test is written to test component boardOverview_grid.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Grid from '../../src/components/board_grid'; 

let wrapper1a;
let wrapper1b;
let wrapper2a;
let wrapper2b;
let wrapper3a;
let wrapper3b;
let wrapper3c;
let wrapper3d;
let wrapper4a;
let wrapper4b;

describe('Test suite for Grid component', () => {
  beforeEach(() => {
    // Prevent duplication
    wrapper1a = shallow(<Grid grid={{status: 0, val: 1}} />);
    wrapper1b = shallow(<Grid grid={{status: 0, val: 9}} />);
    wrapper2a = shallow(<Grid grid={{status: 1, val: 0}} />);
    wrapper2b = shallow(<Grid grid={{status: 1, val: 9}} />);
    wrapper3a = shallow(<Grid grid={{status: 2, val: 9}} />);
    wrapper3b = shallow(<Grid grid={{status: 2, val: 3}} />);
    wrapper3c = shallow(<Grid grid={{status: 2, val: 4}} />);
    wrapper3d = shallow(<Grid grid={{status: 2, val: 5}} />);
    wrapper4a = shallow(<Grid grid={{status: 3, val: 4}} />);
    wrapper4b = shallow(<Grid grid={{status: 3, val: 9}} />);
  });

  it('Grid component should exist', () => {
    expect(wrapper1a).to.exist;
    expect(wrapper2a).to.exist;
    expect(wrapper3a).to.exist;
    expect(wrapper4a).to.exist;
    expect(wrapper1b).to.exist;
    expect(wrapper2b).to.exist;
    expect(wrapper3b).to.exist;
    expect(wrapper4b).to.exist;
  });

  it('Grid should be a div component and belongs to class "grid"', () => {
    expect(wrapper1b.type()).to.equal('div');
    expect(wrapper1a.hasClass('grid')).to.equal(true);
    expect(wrapper2a.type()).to.equal('div');
    expect(wrapper2a.hasClass('grid')).to.equal(true);
    expect(wrapper3a.type()).to.equal('div');
    expect(wrapper3a.hasClass('grid')).to.equal(true);
    expect(wrapper4a.type()).to.equal('div');
    expect(wrapper4a.hasClass('grid')).to.equal(true);
    expect(wrapper1b.type()).to.equal('div');
    expect(wrapper1b.hasClass('grid')).to.equal(true);
    expect(wrapper2b.type()).to.equal('div');
    expect(wrapper2b.hasClass('grid')).to.equal(true);
    expect(wrapper3b.type()).to.equal('div');
    expect(wrapper3b.hasClass('grid')).to.equal(true);
    expect(wrapper4b.type()).to.equal('div');
    expect(wrapper4b.hasClass('grid')).to.equal(true);
  });

  it('Grid should contain initial image if the status of grid is 0', () => {
    let img1a = wrapper1a.childAt(0);
    let img1b = wrapper1b.childAt(0);
    expect(img1a.type()).to.equal('img');
    expect(img1b.type()).to.equal('img');
    expect(img1a.hasClass('grid-initial')).to.equal(true);
    expect(img1b.hasClass('grid-initial')).to.equal(true);
  });

  it('Grid should contail flag image if the status of grid is 1', () => {
    let img2a = wrapper2a.childAt(0);
    let img2b = wrapper2b.childAt(0);
    expect(img2a.type()).to.equal('img');
    expect(img2b.type()).to.equal('img');
    expect(img2a.hasClass('grid-flag')).to.equal(true);
    expect(img2b.hasClass('grid-flag')).to.equal(true);
  });

  it('Grid should contail a image hinting the user has put a flag in a wrong position if the status of grid is 3', () => {
    let img4a = wrapper4a.childAt(0);
    expect(img4a.type()).to.equal('img');
    let img4b = wrapper4b.childAt(0);
    expect(img4b.type()).to.equal('img');
    expect(img4a.hasClass('grid-wrongFlag')).to.equal(true);
    expect(img4a.hasClass('grid-wrongFlag')).to.equal(true);
  });

  it('Grid should display an image showing explosion wrapped under a parent div, if the status is 2 and the value of the gird is 9', () => {
    let img3a = wrapper3a.childAt(0);
    expect(img3a.type()).to.equal('img');
    expect(img3a.hasClass('grid-explosion')).to.equal(true);
  });

  it('Grid should display a span element if the grid status is 2 and the value of gird is not 9', () => {
    let span3b = wrapper3b.childAt(0);
    expect(span3b.type()).to.equal('span');
  });

  it('The text displayed within spans should correspond to the Grid value', () => {
    let span3b = wrapper3b.childAt(0);
    let span3c = wrapper3c.childAt(0);
    let span3d = wrapper3d.childAt(0);
    expect(span3b.text()).to.equal('3');
    expect(span3c.text()).to.equal('4');
    expect(span3d.text()).to.equal('5');
  });
});