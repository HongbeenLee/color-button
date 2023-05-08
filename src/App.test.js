import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color, and update color when clicked', () => {
  render(<App />);
  
  // find an element with a role of button and text of "Change to blue"
  const button = screen.getByRole('button', {
    name: "Change to blue"
  });

  // 모든 assertion은 expect로 시작한다. css을 가지고 있는지 확인한다.
  expect(button).toHaveStyle(`
    background-color: red;
  `);

  // button turns blue when clicked
  fireEvent.click(button);
  
  expect(button).toHaveStyle(`
  background-color: blue;
  `);
  
  expect(button).toHaveTextContent("Change to red");
});

test('checkbox, button initial condition.', () => {
  render(<App />);

  const button = screen.getByRole('button', {
    name: /Change to/
  });
  const checkbox = screen.getByRole('checkbox');

  // checkbox has checked as initial state, the button is enabled.
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
})

test('when checkbox unchecked, button should be disabled.', () => {
  render(<App />);

  const button = screen.getByRole('button', {
    name: /Change to/
  });
  const checkbox = screen.getByRole('checkbox', {
    name: "Disabled button"
  });

  // when checkbox has checked, the button is disabled.
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  // when checkbox has unchecked again, the button is enabled.
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
})