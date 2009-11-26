/*
*********************************************************************************
* Information
*
* Project     : PubZone
* Author      : Martin Kaufmann, martin@kaufmn.de
* File name   : standard.js
* Type        : Javascript
* Version     : 1.0
*
*********************************************************************************
*/


// Variables
var imgpath = "/images";

// Change pictures
function changeimg(name, img)
{
  document.images[(name)].src = imgpath + "/" + img;
}

// Preload pictures
function preload(img)
{
  var imgobj = new Image();
  imgobj.src = imgpath + "/" + img;
}

// Status bar
function message(txt)
{
  window.status = txt;
}

// Copy to clipboard
function copy2clipboard(clptext)
{
  document.clip.board.value = clptext;
  document.clip.board.select();
  document.clip.board.createTextRange().execCommand("Copy");
  alert("The link has been copied to your clipboard and can be inserted again by [Strg + v].");
}

// Get e-mail address
function getMailText(encrypted)
{
  var characters = encrypted.split("|");
  var decrypted = "";
  for(var i=0;i<characters.length;i++)
  {
    decrypted += String.fromCharCode(characters[i]-i-540);
  }
  return decrypted;
}

// Mail link
function getMailLink(encrypted)
{
  var decrypted = getMailText(encrypted);
  document.location = "mailto:" + decrypted;
}

// Add bookmark
function addbookmark(url, title)
{
  if(document.all)
  {
    window.external.AddFavorite(url, title);
  }
  else if(window.sidebar)
  {
    window.sidebar.addPanel(title, url, '');
  }
  else
  {
    alert("Error while setting bookmark!");
  }
}

// Show text in layer
function showmessage(text)
{
  var ebene = 0;
  var layername = "textbox";

  if(document.all)
  {
    document.all[layername+ebene].innerHTML = "<layer width=505 height=205>"+text+"</layer>";
  }
  else if(document.layers)
  {
    document.layers[ebene].document.open();
    document.layers[ebene].document.write(text);
    document.layers[ebene].document.close();
  } 
}

// Activate or deactivate element
function setElement(elementName, elementStatus)
{
  var formElements = document.forms[0].elements;
  for(i=0; i<formElements.length-1; i++)
  {
    thisElement = document.forms[0].elements[i];
    if(thisElement.name == elementName)
    {
      thisElement.disabled = elementStatus;
    }
  }
}

// Open new browser window
function openWindow(path, width, height)
{
  var popup = top.window.open(path, "PubZone", "width=" + width + ", height=" + height + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=yes");
  popup.focus();
}

// Add more form elements to list (e.g. keywords)
function addItems(step, task, numberToAdd, countField, action)
{
  var form = document.forms[1];
  var count = parseInt(form.elements[(countField)].value);
  count += parseInt(numberToAdd);

  form.elements[(countField)].value = count;
  form.task.value = task;
  form.step.value = step;
  form.action = action;
}
    
// Execute an alternative action on form and replace one value
function executeAction(step, value, field, action)
{
  var form = document.forms[1];

  form.elements[(field)].value = value;
  form.step.value = step;
  form.action = action;
}

// Test if a variable does not contain a character
function isEmpty(value)
{
  if(value != null)
  {
    return !(value.match(/\w{2}/));
  }
  return true;
}

// Is none of the radio buttons selected?
function radioEmpty(thisRadio)
{
  // hidden field: only one result
  if(thisRadio.value != "" && thisRadio.length == undefined)
  {
    return false;
  }

  // more than one result
  for (i=0;i<thisRadio.length;i++)
  {
    if (thisRadio[i].checked==true)
    {
      return false;
    }
  }
  return true;
}

// select all checkboxes
function checkAll(formObj) 
{
  for (var i=0;i<formObj.elements.length;i++) 
  {
    var e = formObj.elements[i];
    if(e.name != 'allbox' && e.type=='checkbox' && !e.disabled) 
    {
      e.checked = formObj.allbox.checked;
    }
  }
}

