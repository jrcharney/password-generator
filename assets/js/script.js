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
  size:       16,    // Longer passwords are better
  symbols:    true,  // Use symbols?
  numbers:    true,  // Use numbers?
  uppercases: true,  // Use uppercase letters?
  lowercases: true,  // Use lowercase letters?
  similar:    false, // Use similar characters?
  ambiguous:  false  // Use ambiguous characters?
}


const len_events = ["input","change"];
const len_slide  = qs("#len_slide");
const len_num    = qs("#len_num");
const len_msg    = qs("#len_msg");
//let pw_options.size = 16;   // Default value for length. Might change this to something else later.
len_events.forEach((ek) => {
  len_slide.addEventListener(ek,(ev) => {
    len_num.value = pw_options.size = Number.parseInt(ev.target.value);
    if(pw_options.size < 16){
      len_msg.innerText = "Weak password!";
    } else {
      len_msg.innerText = "";
    }
    //console.log(pw_options.size);
  });  
  len_num.addEventListener(ek,(ev) => {
    len_slide.value = pw_options.size = Number.parseInt(ev.target.value);
    if(pw_options.size < 16){
      len_msg.innerText = "Weak password!";
    } else {
      len_msg.innerText = "";
    }
    //console.log(pw_options.size);
  });  
});

let radios = document.getElementsByName("len_major");
radios.forEach((radio) => {
  radio.addEventListener("change",(ev) => {
    pw_options.size = ev.target.value;
    if(ev.target.id === "use_len_16"){
      len_slide.disabled = len_num.disabled = false;
      len_slide.value = len_num.value = pw_options.size;
    }else{
      len_slide.disabled = len_num.disabled = true;
    }
    //console.log(pw_options.size);
  });
});

let checks = document.getElementsByName("pw_options");
//console.log();


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

/* How about a button to copy that password */

// Temporarily change text in a button
function changeText(button_el, text, textToChangeBackTo) {
  button_el.textContent = text;
  setTimeout(() => button_el.textContent = textToChangeBackTo, 1000);
}

// Copy the text in a text field to the clipboard
function copy(text_el){
// Select the text field
text_el.select();
text_el.setSelectionRange(0, 99999); // For mobile devices
// Copy the text inside the text field
navigator.clipboard.writeText(text_el.value);
}

qs(`#copy`).addEventListener("click",(ev) => {
  copy(qs(`#password`));
  const el = ev.target;
  changeText(el,"Copied!",el.textContent);
});