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
  opts: {
    symbols:   true,  // Use symbols?
    numbers:   true,  // Use numbers?
    uppercase: true,  // Use uppercase letters?
    lowercase: true,  // Use lowercase letters?
    similar:   false, // Use similar characters?
    ambiguous: false  // Use ambiguous characters?
  }
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

function setOptions(checks){
  // Set all our our options to false
  pw_options.opts = Object.fromEntries(Object.entries(pw_options.opts).map(([k,v]) => [k, false]));
  // Get the list of options
  let keys = Object.keys(pw_options.opts);
  // Get the list of found options
  let vals = Array.from(checks).filter((x) => x.checked === true).map((x) => x.value);
  // Set each value found to true
  vals.forEach((val) => {pw_options.opts[val] = keys.includes(val);});
  //console.log(pw_options.opts);
  // TODO: return the number of checkboxes checked? (Or we could count the number of true values.)
} 

let checks = document.getElementsByName("pw_checks");
//console.log(Array.from(checks).filter((x) => x.checked === true).map((x) => x.value));
checks.forEach((check) => {
  check.addEventListener("change",(ev) => {
    //console.log(Array.from(checks).filter((x) => x.checked === true).map((x) => x.value));
    setOptions(checks);
  });
});

// Assignment code here
function generatePassword(){
  // TODO: Don't generate a password if none of the checkboxes are checked
  //let password = "How are you, gentlemen. All your base are belong to us.";
  let password = [];
  let charset = "";   // Let's start with an empty character set;

  let charsets = {
    symbols:   "!#$%&*+-=?@^_",             // Excludes similar and amgbigous symbols 
    numbers:   "23456789",                  // Excludes similar and ambiguous numbers
    uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",  // Excludes similar and ambiguous letters
    lowercase: "abcdefghjkmnpqrstuvwxyz",   // Excludes similar and ambiguous letters
    similar:   {                            // We need to add these bases on what the answer is for similar sets
      symbols:  "|",                        // similar symbols
      numbers:  "01",                        // similar numbers
      uppercase: "IO",                      // similar uppercase
      lowercase: "ilo"                      // similar lowercase
    },
    ambiguous: "{}[]()\/'\"`~,;:.<>\\"      // Excludes similar symbols
  }

  // Build our character set
  if(pw_options.opts.symbols){
    charset += charsets.symbols;
    if(pw_options.opts.similar){
      charset += charsets.similar.symbols;
    }
  }
  if(pw_options.opts.numbers){
    charset += charsets.numbers;
    if(pw_options.opts.similar){
      charset += charsets.similar.numbers;
    }
  }
  if(pw_options.opts.uppercase){
    charset += charsets.uppercase;
    if(pw_options.opts.similar){
      charset += charsets.similar.uppercase;
    }
  }
  if(pw_options.opts.lowercase){
    charset += charsets.lowercase;
    if(pw_options.opts.similar){
      charset += charsets.similar.lowercase;
    }
  }
  if(pw_options.opts.ambiguous){
    charset += charsets.ambiguous;
    // No similars here
  }

  if(charset.length === 0){
    return "I need you to check at least two of the checkboxes!";
  }

  password = charset;
  /*
  for(let i = 0; i < pw_options.size; i++){
    // Randomly pick a password from the characters in our character set.
    password.push();
  }
  */

  //password = password.join("");

  return password;
}

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