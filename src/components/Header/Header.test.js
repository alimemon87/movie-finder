import React from 'react'                                              
import {shallow} from 'enzyme';        
import renderer from 'react-test-renderer';
import Header from './Header';


describe('Header Component', () => {
    it('Should render withour errors', () => {
      const component = shallow(<Header />);
      const wrapper = component.find('.form-inline');
      expect(wrapper.length).toBe(1);
    });
  });  
