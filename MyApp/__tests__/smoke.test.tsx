import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../app/(tabs)/index';

test('renders Home', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toBeTruthy();
});
