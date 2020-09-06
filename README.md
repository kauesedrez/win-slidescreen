```javascript
import {
  make,
  scroll,
} from "../node_modules/win-slidescreen/src/slideScreen.js";
import { screen, slideScreen } from "./constructos/slideScreen.js";
import { content, bt } from "./constructos/welcome.js";
// import { W } from "../node_modules/winnetoujs/src/winnetou.js";

// global vars
var mainPage, profilePage;

const render = () => {
  // create slideScreen container
  const container = slideScreen().create("#app");

  // create the screens inside de main container
  mainPage = screen().create(container.ids.slideScreen);
  profilePage = screen().create(container.ids.slideScreen);

  // initialize the slideScreen business logic
  make(container.ids.slideScreen, "#app");

  // add some content to the pages
  content({ text: "Main Page" }).create(mainPage.ids.screen);
  bt({ text: "Go to profile", action: "toPage2()" }).create(
    mainPage.ids.screen
  );
  content({ text: "Profile Page" }).create(profilePage.ids.screen);
  bt({ text: "Back Home", action: "toPage1()" }).create(
    profilePage.ids.screen
  );

  // turn global access
  // @ts-ignore
  window.toPage2 = toPage2;
  // @ts-ignore
  window.toPage1 = toPage1;
};

render();

function toPage2() {
  scroll(profilePage.ids.screen);
}

function toPage1() {
  scroll(mainPage.ids.screen);
}
```

# Using Winnetou Router

```javascript
import {
  make,
  scroll,
} from "../node_modules/win-slidescreen/src/slideScreen.js";
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
});

// global vars
var mainPage, profilePage;

const render = () => {
  // create slideScreen container
  const container = slideScreen().create("#app");

  // create the screens inside de main container
  mainPage = screen().create(container.ids.slideScreen);
  profilePage = screen().create(container.ids.slideScreen);

  // initialize the slideScreen business logic
  make(container.ids.slideScreen, "#app");

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

  // turn global access
  // @ts-ignore
  window.toPage2 = toPage2;
  // @ts-ignore
  window.toPage1 = toPage1;
};

render();

function toPage2() {
  scroll(profilePage.ids.screen);
}

function toPage1() {
  scroll(mainPage.ids.screen);
}
```

# With Winnetou Pass

```javascript
import {
  make,
  scroll,
} from "../node_modules/win-slidescreen/src/slideScreen.js";
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
  make(container.ids.slideScreen, "#app");

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
  scroll(profilePage.ids.screen);
}

function toPage1() {
  scroll(mainPage.ids.screen);
}

function menu() {
  scroll(menuPage.ids.screen);
}
```
