import React from 'react';
import App from '../../src/components/app';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import chai, { expect } from 'chai';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderIntoDocument(<App />);
  });

  it('render the App component', () => {
    expect(component).to.exist;
  });

  it('Check the title text', () => {
    let DOMNode = findDOMNode(component);
    expect(DOMNode.querySelector('h1').textContent).to.equal('This is the app component');
  });

  it('Should have a redirect function', () => {
    expect(component.redirect).to.exist;
  });

});
