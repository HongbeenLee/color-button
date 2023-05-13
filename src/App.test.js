import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpace } from "./App";

test("button has correct initial color, and update color when clicked", () => {
  render(<App />);

  // find an element with a role of button and text of "Change to blue"
  const button = screen.getByRole("button", {
    name: `Change to Midnight Blue`,
  });

  // 모든 assertion은 expect로 시작한다. css을 가지고 있는지 확인한다.
  expect(button).toHaveStyle(`
    background-color: MediumVioletRed;
  `);

  // button turns blue when clicked
  fireEvent.click(button);

  expect(button).toHaveStyle(`
  background-color: MidnightBlue;
  `);

  expect(button).toHaveTextContent("Change to Medium Violet Red");
});

test("checkbox, button initial condition.", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: /Change to/,
  });
  const checkbox = screen.getByRole("checkbox");

  // checkbox has checked as initial state, the button is enabled.
  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("when checkbox unchecked, button should be disabled.", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: /Change to/,
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "Disabled button",
  });

  // when checkbox has checked, the button is disabled.
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  // when checkbox has unchecked again, the button is enabled.
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("버튼이 비활성회되면, disabled 색상을 보여주고 활성화되면 기존 색으로 돌아온다.", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: /Change to/,
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "Disabled button",
  });

  // 버튼 비활성화 -> 회색 확인 -> 활성화 -> 기존색으로 돌아오는지 확인
  fireEvent.click(checkbox);
  expect(button).toHaveStyle(`
  background-color: gray;
  `);
  fireEvent.click(checkbox);
  expect(button).toHaveStyle(`
  background-color: MediumVioletRed;
  `);

  // 버튼색 변경 -> 비활성화 -> 회색확인 -> 활성화 -> 기존색인지 확인
  fireEvent.click(button);
  fireEvent.click(checkbox);
  expect(button).toHaveStyle(`
  background-color: gray;
  `);
  fireEvent.click(checkbox);
  expect(button).toHaveStyle(`
  background-color: MidnightBlue;
  `);
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpace("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpace("MediumVioletRed")).toBe("Medium Violet Red");
  });
});

// 시작할때는 MediumVioletRed, 그리고 MidnightBlue로 바뀌는지
// 원래는 red -> blue 였는데 스펙이 변경되었으니까 기존 테스트를 업데이트해야함
// checkbox 테스트는 기존대로 동작해야함. (free regression testing!)
