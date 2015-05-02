var g_filename = 'GASAPIDemo';
var g_getSheetName = 'get';
var g_postSheetName = 'post';
var g_mimeTypeContainStr = 'spreadsheet';

/**
 * Driveの中から最初に見つかった、targetFileNameのスプレッドシートを取得する
 * @return SpreadSheet 
 */
function getFirstMatchedSpreadSheet(targetFileName)
{
  var resFile = null;
  
  var files = DriveApp.getFilesByName(targetFileName);
  while (files.hasNext()) {
    var file = files.next();
    if(file.getMimeType().indexOf(g_mimeTypeContainStr) != -1){
      resFile = file;
      break;
    }
  }
  return SpreadsheetApp.open(resFile);
}

/**
 * Driveの中から最初に見つかった、filenameファイルのsheetnameシート取得する
 * @return Sheet
 */
function getFirstMatchedFileAndSheet(filename, sheetname)
{
  var targetFile = getFirstMatchedSpreadSheet(filename);
  if(!targetFile){
    return null;
  }

  var targetSheet = targetFile.getSheetByName(sheetname);
  if(!targetSheet){
    return null;
  }
  return targetSheet;
}

