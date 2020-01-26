import React from 'react'                                              
import {shallow} from 'enzyme';        
import renderer from 'react-test-renderer';
import Search from './Search';

it('matches the snapshot', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('SearchForm', () => {
    it('check button', () => {
      // Mock search form parameters.
      const searchQuery = 'kittens';
      const onSubmit = jest.fn();
  
      // Create test component instance.
      const testComponentInstance = renderer.create((
        <Search query={searchQuery} onSearchSubmit={onSubmit} />
      )).root;
  
      // Try to find submit button inside the form.
      const submitButtonInstance = testComponentInstance.findByProps({
        type: 'submit',
      });
      expect(submitButtonInstance).toBeDefined();
  
    });
  });

  describe('Seach', () => {
    it('button click should hide component', () => {
      const component = shallow(<Search />);
      const wrapper = component.find('#my-button');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Searchbar', () => {
    it('Check search field', () => {
      const component = shallow(<Search />);
      const wrapper = component.find('.mr-sm-2');
      expect(wrapper.length).toBe(1);
    }); 
  });

  
 