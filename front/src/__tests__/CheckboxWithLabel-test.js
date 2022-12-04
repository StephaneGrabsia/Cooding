/* eslint-disable react/react-in-jsx-scope */
import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxWithLabel from '../components/CheckboxWithLabel';


// Démonte et nettoie le DOM après que le test soit terminé.
afterEach(cleanup);

it('CheckboxWithLabel change le texte après click', () => {
  const {queryByLabelText, getByLabelText} = render(
      <CheckboxWithLabel labelOn= 'On' labelOff='Off' />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
