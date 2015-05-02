/**
 * Post API
 * @return json object
 */
function doPost(e) {
  
  if(!e) return;
  
  var paramStr = e.postData['contents'];
  // debug
//  var paramStr = '{"Users": [{"id": "1", "created": "2015-05-02 07:32:01 +0000", "name": "人造人間1号"},{"id": "2", "created": "2015-05-02 07:32:01 +0000", "name": "人造人間2号"}]}';
  var params = JSON.parse(paramStr);
  
  var targetSheet = getFirstMatchedFileAndSheet(g_filename, g_postSheetName);
  if(!targetSheet) return;
  
  // First row must be parameter names
  var dataRng = targetSheet.getDataRange();
  var cells = dataRng.getValues();
  if(!cells || cells.length < 1){
    return;
  }
  
  // Make data array[][] to plot spreadsheet range
  var paramNames = cells[0];
  var dataAry = [];
  params["Users"].forEach(function(aParamDic, idx){
    var plotLine = [];
    paramNames.forEach(function(paramName, pnIdx){
      var val = aParamDic[paramName];
      plotLine[pnIdx] = (val) ? val : "";
    });
    dataAry.push(plotLine);
  });
  
  // Append data after last data line
  dataRng.offset(dataRng.getNumRows(),0,dataAry.length).setValues(dataAry);
  
  var result = {};
  result['data'] = dataAry;
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  
}

