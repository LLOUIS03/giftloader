/**
 * A function to define the css class name of the TopButton
 * if it has an state to not show add only the class that
 * not show it but if it has the show top button state
 * to show it add the class that can show it
 */
export const canTopButtonShow = showTopButton => {
  return !showTopButton ? 'topBtn ' : 'topBtn show';
};

/**
 * A function to scroll the windows to the top ans set false
 * the showTopButton
 */
export const scrollWindowsToTop = setShowTopButtonState => {
  return () => {
    setShowTopButtonState(false);
    window.scrollTo(0, 0);
  };
};

export const onCloseLightBox = (setVisibleLightBox, setSelectedImgIndex) => {
  return () => {
    setVisibleLightBox(false);
    setSelectedImgIndex(undefined);
  };
};
