import React from 'react'                                              
import Button from './Search.js'                              
import {shallow, configure} from 'enzyme';                             
import Adapter from 'enzyme-adapter-react-16';        

configure({ adapter: new Adapter() });  

test('it calls start logout on button click', () => {
    const mockLogout = jest.fn();
    const wrapper = shallow(<Button startLogout={mockLogout}/>);
    wrapper.find('submit').at(0).simulate('click');
    //const mockLogout = jest.fn();
    //const wrapper = shallow(<Button startLogout={mockLogout}/>);
    //wrapper.find('button').at(0).simulate('click');
    //expect(mockLogout).toHaveBeenCalled();
});

describe('SearchForm', () => {
    it('should fire onSubmit form callback', () => {
      // Mock search form parameters.
      const searchQuery = 'kittens';
      const onSubmit = jest.fn();
  
      // Create test component instance.
      const testComponentInstance = renderer.create((
        <SearchForm query={searchQuery} onSearchSubmit={onSubmit} />
      )).root;
  
      // Try to find submit button inside the form.
      const submitButtonInstance = testComponentInstance.findByProps({
        type: 'submit',
      });
      expect(submitButtonInstance).toBeDefined();
  
      // Since we're not going to test the button component itself
      // we may just simulate its onClick event manually.
      const eventMock = { preventDefault: jest.fn() };
      submitButtonInstance.props.onClick(eventMock);
  
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(searchQuery);
    });
  });

 