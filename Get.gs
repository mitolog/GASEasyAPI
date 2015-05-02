/**
 * Get API
 * @return json object
 */
function doGet(e) {
  
  var getSheet = getFirstMatchedFileAndSheet(g_filename, g_getSheetName);
  if(!getSheet) return;
  
  // First row must be parameter names
  var cells = getSheet.getDataRange().getValues();
  var paramNames = [];
  if(!cells || cells.length <= 1){
    return;
  }
  
  paramNames = cells[0];
  cells.shift();
  
  var userLists = [];
  cells.forEach(function(aLine, idx){
    var aDic = {};
    aLine.forEach(function(elem, elemIdx){
      aDic[paramNames[elemIdx]] = elem;
    });
    userLists.push(aDic);
  });
  
  var result = {};
  result['data'] = userLists;

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  
}

