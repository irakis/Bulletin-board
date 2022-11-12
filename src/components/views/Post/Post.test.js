import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}><PostComponent /></Provider>);
    expect(component).toBeTruthy();
  });
});
