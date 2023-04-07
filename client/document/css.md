### 1. Classname Convention:
* It is important to give different classname for styling for each and every file to work perfectly.

### 2. How to center the item with position absolute:
```css
.messageDiv{
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
```
* With position: absolute you can fix the position in div and that position is always fixed and that item is always displayed thier.

### 3. Code Reusability in CSS:
* It is important to reuse the same div container class name or id if you are creating same style to other container instead of copy pasting same code. <br>
e.g. I used same css code for both login and register page with Register.css file and also in Header.css file for both auth or non auth navbar.

### 4. Make Btn Container transparent:
```css
  .transparentBtn{
    border: 0px solid white; 
    background-color: transparent;
  }
```

### 5. How to create Popup screen(Modal) in React using CSS:
* For basic Structure of Modal go to editPassword.jsx file.
* Here CSS is important for backgroud blur and all.
* z-index of parent container must be less than child container in .css file.
* e.g.-> Basic Style:
```css
  .editOverlay {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .editModalContainer {
      width: 382px;
      height: 298px;
      position: fixed;
      top: 30%;
      left: 50%;

      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
      border-radius: 8px;
      z-index: 2;
    }

```

### 6. There could be several reasons why your word in a div container is not displaying on the same line using CSS. Here are a few possible reasons:

* CSS Display Property: If you have set the display property of the div container to "block," it will take up the full width of its parent container, forcing the next element to a new line. You can set the display property to "inline" or "inline-block" to make the container display on the same line as other inline elements.

* CSS Float Property: If you have floated the div container to the left or right, it will take up only the necessary width, allowing other elements to display on the same line. If you haven't floated the container, it may be that other elements on the page are not allowing it to fit on the same line.

* CSS Margin or Padding: If you have added margin or padding to the div container, it could be pushing other elements onto a new line. You can try reducing the margin or padding to see if that allows the container to display on the same line.

* Width of the Container: If the container is wider than the available space on the line, it will naturally wrap onto a new line. You can try reducing the width of the container or adjusting the size of other elements on the page to make sure everything fits on the same line.

* HTML Structure: It is also possible that the HTML structure of your page is causing the issue. You may want to check that your HTML is valid and properly nested, and that there are no unclosed tags or other errors that could be affecting the display of the container.

### 7. How to center the container perfectly:
```css
.container{
  display: flex;
  flex-direction: row; 
  justify-content: center;
}
```

or

```css
.container{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
```

### 8. How to set the height of container which depends on item appended from DB in react using css:
```js
  import { useState, useEffect } from "react";
  function Container({ items }) {
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
      // Calculate the height of the container based on the number of items
      const height = items.length * 50; // Assuming each item is 50px tall
      setContainerHeight(height);
    }, [items]);

    return (
      <div style={{ height: `${containerHeight}px` }}>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  }
```
* To understand better go to PasswordPage.jsx file and see useEffect hook and .main-container.

### justify content not working:
* position is set to absolute, remove position and instead use padding or margin.

