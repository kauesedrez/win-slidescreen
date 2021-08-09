# Definition

SlideScreen is a WinnetouJs plugin that creates screens that can x-axis scroll content.

# Imports

```javascript
import { SlideScreen } from "../node_modules/win-slidescreen/src/slideScreen.js";
// In mobile use
// SlideScreenMobile
import { screen, slideScreen } from "./constructos/slideScreen.js";
```

# Construction

```javascript
// create slideScreen container
const container = slideScreen().create("#app");

// create the screens inside de main container
mainPage = screen().create(container.ids.slideScreen);
profilePage = screen().create(container.ids.slideScreen);
menuPage = screen().create(container.ids.slideScreen);
```

# Usage

```javascript
// make
// param 1: the slidescreen constructo id
// param 2: the container where slidescreen constructo was created
SlideScreen.make(container.ids.slideScreen, "app");

// to scroll
// param 1: the id of created screen
SlideScreen.scroll(profilePage.ids.screen);
```

# Use sample

```javascript
import { SlideScreen } from "../node_modules/win-slidescreen/src/slideScreen.js";
import { screen, slideScreen } from "./constructos/slideScreen.js";
import { content, bt } from "./constructos/welcome.js";
import { Winnetou } from "../node_modules/winnetoujs/src/winnetou.js";

// Register winnetou
// @ts-ignore
window.Winnetou = Winnetou;

// Winnetou router
Winnetou.createRoutes({
  "/": toPage1,
  "/profile": toPage2,
  menu,
});

// global vars
var mainPage, profilePage, menuPage;

const render = () => {
  // create slideScreen container
  const container = slideScreen().create("#app");

  // create the screens inside de main container
  mainPage = screen().create(container.ids.slideScreen);
  profilePage = screen().create(container.ids.slideScreen);
  menuPage = screen().create(container.ids.slideScreen);

  // initialize the slideScreen business logic
  SlideScreen.make(container.ids.slideScreen, "app");

  // add some content to the pages
  content({ text: "Main Page" }).create(mainPage.ids.screen);
  bt({
    text: "Go to profile",
    action: "Winnetou.navigate('/profile')",
  }).create(mainPage.ids.screen);
  content({ text: "Profile Page" }).create(profilePage.ids.screen);
  bt({ text: "Back Home", action: "Winnetou.navigate('/')" }).create(
    profilePage.ids.screen
  );
  bt({ text: "MENU", action: "Winnetou.pass('menu')" }).create(
    profilePage.ids.screen
  );
  content({ text: "MENU" }).create(menuPage.ids.screen);

  // turn global access
  // @ts-ignore
  window.toPage2 = toPage2;
  // @ts-ignore
  window.toPage1 = toPage1;
};

render();

function toPage2() {
  SlideScreen.scroll(profilePage.ids.screen);
}

function toPage1() {
  SlideScreen.scroll(mainPage.ids.screen);
}

function menu() {
  SlideScreen.scroll(menuPage.ids.screen);
}
```

# New in version 3

Use ids.content to insert data into screen constructo to correct hide scroll in desktop navigation when use "direct" parameter.

```javascript
content({ text: "Main Page" }).create(mainPage.ids.content);

// but scroll still need the screen id, like version 2:
SlideScreen.scroll(mainPage.ids.screen, "direct");
```

# Scroll Restoration

If you use an scroll restoration own algorithm, add `history.scrollRestoration = "manual"` somewhere in your code to prevent browser to automatic scroll page.
