
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Search from './Search';

describe('Component: Search', () => {
  let wrapper = shallow(<Search />);

  it('component has length', () => {
    expect(wrapper.length).toEqual(1) 
  });

  it('renders as a <div>', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('Containers a cuisines section', () => {
    expect(wrapper.contains(<div>Cuisine/Food Type</div>)).toEqual(true);
  });

  it('The page div containers are for the search bar and the content', () => {
    expect(wrapper.find('div').at(1).hasClass('search_container')).toEqual(true);
    expect(wrapper.find('div').at(2).hasClass('main-content')).toEqual(true);
  });

  it('Side bar contains a ratings section ', () => {
    expect(wrapper.find('.sidebar_ratings').length).toEqual(1); //).to.have.length(2);
  });

  it('contains 7 Cuisine Types', () => {
    expect(wrapper.find('.cuisine_item').length).toEqual(7); //).to.have.length(2);
  });

  it('Contains 1 input field', () => {
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('Input field has an onChange event handler', () => {
    expect(wrapper.find('input').props().onChange);
  });

});
