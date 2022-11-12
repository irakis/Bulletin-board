import React from 'react';
import { shallow } from 'enzyme';
import { MainLayoutComponent } from './MainLayout';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';

describe('Component MainLayout', () => {
  it('should render without crashing', () => {
    const component = shallow(<Provider store={store}><MainLayoutComponent /></Provider>);
    expect(component).toBeTruthy();
  });
});
