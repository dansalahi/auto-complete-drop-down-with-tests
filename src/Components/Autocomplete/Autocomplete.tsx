import React, { useState } from "react";

const initalValues = [
  { icon: "🍎", item: "Apple" },
  { icon: "🍌", item: "Banana" },
  { icon: "🍒", item: "Cherry" },
  { icon: "📅", item: "Date" },
  { icon: "🌰", item: "Fig" },
  { icon: "🍇", item: "Grape" },
  { icon: "🥝", item: "Kiwi" },
];

const AutocompleteSelect = () => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isKeyboardNavigationOn, setIsKeyboardNavigationOn] = useState(false);

  const [options, setOptions] = useState(initalValues);
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) => {
    const regex = new RegExp(`.*${inputValue}.*`, "i");
    return regex.test(option.item);
  });

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActiveOptionIndex(0);
    setInputValue(event.target.value);
    setShowOptions(true);
  };

  const handleToggle = () => {
    setShowOptions((prev) => !prev);
  };

  const handleInputClick = () => {
    setShowOptions(true);
    setIsKeyboardNavigationOn(true);
  };

  const handleKeyPress = (e: any) => {
    if (isKeyboardNavigationOn === false) return;

    if (e.keyCode === "38") {
      handleArrowUp();
    } else if (e.keyCode === "40") {
      handleArrowDown();
    } else if (e.keyCode === "13") {
      handlePressEnter();
    }
  };

  const handleInputBlur = (e: any) => {
    setTimeout(() => {
      setShowOptions(false);
      setIsKeyboardNavigationOn(false);
    }, 200);
  };

  const handleArrowDown = () => {
    if (activeOptionIndex > filteredOptions.length - 2) return;
    setActiveOptionIndex((prev) => prev + 1);
  };

  const handleArrowUp = () => {
    if (activeOptionIndex < 1) return;
    setActiveOptionIndex((prev) => prev - 1);
  };

  const handlePressEnter = () => {
    setShowOptions(false);
    setInputValue(filteredOptions[activeOptionIndex].item);
    setShowOptions(false);
  };

  const handleOptionSelect = (option: React.SetStateAction<string>) => {
    setShowOptions(false);
    setInputValue(option);
    setShowOptions(false);
  };

  const handleHoverOption = (option: any) => {
    console.log(option.target);
    // setActiveOptionIndex(filteredOptions?.findIndex(option))
  };

  return (
    <div>
      <div
        className={
          showOptions ? "active-autocomplete-wrapper" : "autocomplete-wrapper"
        }
      >
        <div className={showOptions ? "input" : "active-input"}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            placeholder="Choose a Fruit:"
            onKeyDown={handleKeyPress}
            className={showOptions ? "form-input" : "active-form-input"}
          />

          {showOptions ? (
            <img
              width="24"
              src="/arrow-up.svg"
              alt="Arrow pointing down"
              onClick={handleToggle}
              onBlur={handleInputBlur}
            />
          ) : (
            <img
              width="24"
              src="/arrow-down.svg"
              alt="Arrow pointing down"
              onClick={handleToggle}
              onBlur={handleInputBlur}
            />
          )}
        </div>

        {showOptions && (
          <div className="options-wrapper">
            {filteredOptions.map((option, index) => (
              <div
                key={option.item}
                onClick={() => handleOptionSelect(option.item)}
                onMouseOver={handleHoverOption}
                className="options"
                style={{
                  cursor: "pointer",
                  backgroundColor: index === activeOptionIndex ? "" : "",
                }}
              >
                {`${option.icon} ${option.item}`}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteSelect;
