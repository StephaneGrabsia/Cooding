import renderer from 'react-test-renderer';
import {ResponsiveAppBar} from './appBar';

it('Rendering the app bar', () => {
  const component = renderer.create(<ResponsiveAppBar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapchot();
});
