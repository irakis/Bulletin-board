import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}><HomepageComponent /></Provider>);
    expect(component).toBeTruthy();
  });
});
