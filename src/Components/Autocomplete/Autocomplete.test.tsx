import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AutocompleteSelect from "./Autocomplete";

describe("AutocompleteSelect", () => {
  test("renders the input field", () => {
    render(<AutocompleteSelect />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<AutocompleteSelect />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "App" } });
    // @ts-ignore
    expect(inputElement.value).toBe("App");
  });

  test("updates input value on option click", () => {
    render(<AutocompleteSelect />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.click(inputElement);
    const optionElement = screen.getByText("🍎 Apple");
    fireEvent.click(optionElement);
    // @ts-ignore
    expect(inputElement.value).toBe("Apple");
  });

  test("hides options on input blur", () => {
    render(<AutocompleteSelect />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.click(inputElement);
    fireEvent.blur(inputElement);
    const optionsWrapper = screen.queryByTestId("options-wrapper");
    expect(optionsWrapper).not.toBeInTheDocument();
  });
});
