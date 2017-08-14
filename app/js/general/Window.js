// Get Window Width
const getWindowWidth = () => window.innerWidth ||
                            document.documentElement.clientWidth ||
                            document.body.clientWidth;

// Get Window Height
const getWindowHeight = () => window.innerHeight ||
                            document.documentElement.clientHeight ||
                            document.body.clientHeight;

// Get Element Width
const getElementWidth = el => el.clientWidth;

// Get Element Height
const getElementHeight = el => el.clientHeight;

export {
  getWindowWidth,
  getWindowHeight,
  getElementWidth,
  getElementHeight
}
