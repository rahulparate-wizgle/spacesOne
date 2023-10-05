import Choices from 'choices.js';

export function initHeroCreateListingForm() {
  return {
    initSelects() {
      const genericExamples = document.querySelectorAll("[data-choice-select]");
      for (let i = 0; i < genericExamples.length; ++i) {
        var element = genericExamples[i];
        new Choices(element, {
          placeholder: true,
          placeholderValue: "Select an option",
          searchPlaceholderValue: "Search...",
        });
      }
    },
  };
}
