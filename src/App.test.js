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
