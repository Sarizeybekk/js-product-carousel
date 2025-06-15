# Product Carousel Case
This project implements a pixel-perfect replica of the product carousel found on the homepage of the Ebebek website. 
It dynamically fetches and displays products, allowing users to interact with items by favoriting them and navigating through a responsive carousel.
The entire application is built using plain JavaScript, without relying on any external UI libraries or frameworks.

## Features
- Fetches product data from a remote API or loads from cache
- Works only on homepage; logs "wrong page" otherwise
- Pixel-perfect and responsive layout across all viewports
- Favorites stored and restored via localStorage
- Opens product links in new tab
- Renders entire UI using vanilla JavaScript
- No third-party libraries used
- Drag/swipe support for product navigation
- All logic inside a single JavaScript file

## Installation & Usage

This project does not require any package installation or compilation process. It is designed to be run directly in the browser.

Follow the steps below to get started:

1. **Clone the repository to your local machine:**

   ```bash
   git clone https://github.com/Sarizeybekk/js-product-carousel.git
   
1. **Open the ebebek homepage.**  
   > Make sure the URL ends with `/` or `/index.html`.  
   > [https://www.ebebek.com/](https://www.ebebek.com/)

2. **Open the developer console.**  
   (Right-click on the page and select "Inspect" or open Developer Tools.)

3. **Copy all the JavaScript code from the `SULTAN_SARIZEYBEK.js` file.**

4. **Paste the code into the console and press Enter.**

---
>  **Note:**  
> The script is configured to run **only on the homepage**.  
> If you run it on any other page, it will log the following message:
> `"wrong page"`
---
## Technologies Used
This project is made using **just plain JavaScript**, without any libraries or frameworks.
Everything you see — from the layout to the styles — is created with JavaScript.
Here's what it uses:
- **Fetch API** to load products from a remote source  
- **localStorage** to remember favorite items  
- **Responsive design** with styles added through JavaScript  
- **Drag and swipe** support using simple mouse events

##  Test Coverage
###  Homepage Check
- [x] Code executes **only** on homepage (`/` or `/index.html`)
- [x] On other pages, logs `wrong page` in console

![image](https://github.com/user-attachments/assets/32a347a8-9252-4aa8-8492-d6b0e3859f6c)
![image](https://github.com/user-attachments/assets/ea5ff404-2dd4-434d-a14c-34fa4653aeab)

###  Carousel Rendering
- [x] Carousel appears **after the stories section**
- [x] Title is exactly: `Beğenebileceğinizi düşündüklerimiz`
- [x] Layout is **pixel-perfect**
- [x] Responsive

![image](https://github.com/user-attachments/assets/2064432d-8e23-455b-b5b6-0c22d55a296b)
![image](https://github.com/user-attachments/assets/4aee8eb5-cbe5-451a-a234-95b2c412c826)
![image](https://github.com/user-attachments/assets/1c166d15-e3e6-4186-8a11-ad86f36758e9)

###  Product Listing
- [x] Products fetched from:
  - [x] Remote on first load
  - [x] `localStorage` on subsequent loads
- [x] Product click opens in a **new tab**

![image](https://github.com/user-attachments/assets/6483bf4e-778f-4e85-a09d-1001671a66a6)


###  Pricing Display
- [x] If `original_price` ≠ `price`:
  - [x] Both values are shown
  - [x] Discount percentage is calculated and displayed
- [x] If no discount, only current `price` is shown

   ![image](https://github.com/user-attachments/assets/62f150fc-3c5d-49d8-ad8a-c539e0c39354)


###  Favorite Feature
- [x] Clicking heart icon:
  - [x] Fills with **orange** color
  - [x] Saves product to `localStorage`
- [x] On page reload:
  - [x] Previously liked items remain selected

  <img width="1501" alt="Ekran Resmi 2025-06-15 20 17 34" src="https://github.com/user-attachments/assets/dde5d281-64ae-4cca-b850-80406fdc4a94" />

###  Performance Optimization
- [x] Avoids duplicate network requests
  - [x] Uses cached `localStorage` data if available

###  Drag & Swipe Support
- [x] Carousel supports dragging on desktop
- [x] Works with touch gestures on mobile devices
- [x] Proper snapping after drag
---
## Demo
Click the image below to watch a short demo showcasing all the features in action:
[![Watch the demo](https://img.youtube.com/vi/-F577isXZMo/0.jpg)](https://youtu.be/-F577isXZMo)
