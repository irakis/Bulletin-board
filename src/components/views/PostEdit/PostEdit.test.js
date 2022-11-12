import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}><PostEditComponent /></Provider>);
    expect(component).toBeTruthy();
  });
});
