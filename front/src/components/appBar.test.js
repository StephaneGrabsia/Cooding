import renderer from 'react-test-renderer';
import {ResponsiveAppBar} from './appBar';

it('Rendering the app bar', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  const component = renderer.create(<ResponsiveAppBar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapchot();
});
