/* File: assets/js/script.js
 */

// Some of my code from a codepen I wrote.

/* Since we can't call `:root` in qs to manipulate CSS variables in the `:root` section, need to use `document.documentElement` instead. */
const root = document.documentElement; 

/**
 * @method qs
 * @info Query Selector (qs) uses a CSS query selector to select one or more items using the querySelector or querySelectorAll methods, respectively.
 * @param {string} query CSS Query Selector
 * @param {boolean} all (optional) Select one item or all items.
 * @returns HTMLElement or NodeList
 */
let qs = (query,all=false) => document[`querySelector${all?"All":""}`](query);

/**
 * @method css
 * @info CSS get and set, simplified.
 * @param {HTMLElement} el The element that this function is being used on.
 * @param {string} prop The property of that element. It could also be a CSS variable name.
 * @param {varies} val (optional) The value of that property. If omitted or if the value is undefined, css() will get the current value of the property, if it exists.
 * @returns 
 */

//let getCS = (el) => (prop) => getComputedStyle(el).getPropertyValue(prop);
//let setCS = (el) => (prop,val) => el.style.setProperty(prop,val);
//let css = (el) => (prop, val) => (val === undefined) ? getCS(el)(prop) : setCS(el)(prop,val);
let css = (el) => (prop, val) => (val === undefined) ? getComputedStyle(el).getPropertyValue(prop) : el.style.setProperty(prop,val);

// Password options
let pw_options = {
  length:     16,    // Longer passwords are better
  symbols:    true,  // Use symbols?
  numbers:    true,  // Use numbers?
  uppercases: true,  // Use uppercase letters?
  lowercases: true,  // Use lowercase letters?
  similar:    false, // Use similar characters?
  ambiguous:  false  // Use ambiguous characters?
}


const events = ["input","change"];
events.forEach((ek) => {

});

// Assignment code here

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
