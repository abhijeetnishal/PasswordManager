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