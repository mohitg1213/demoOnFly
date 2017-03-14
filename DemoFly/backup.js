






function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
// console.log(tabs);
    var url = tab.url;
    var title = tab.title;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    // callback(url, title);
  });

  chrome.tabs.executeScript(
    null, 
    {file: "content_script.js"}
    );

}
chrome.runtime.onMessage.addListener(function(request) {
  console.log(request);
  renderStatus(request[0], request[1], request[2]);
});

function test(){
  console.log('aaya');
}

function toggleme(element_id, value='none'){
  document.getElementById(element_id).style.display = value;
}

function renderStatus(module_name, odoo_version, module_title) {

  if ((!odoo_version) || ((odoo_version!="10.0") && (odoo_version!="9.0")))
    {
      toggleme('capture-menu1', 'show');
      toggleme('capture-menu', 'none');
    }
else
{
    url_10="http://odoodemo.webkul.com/?version="+odoo_version+"&ext=1&" ;
    // url_9 = "http://odoodemo.webkul.com/?version=10.0&ext=1&" ;
    document.getElementById('10').href = url_10 + "module=" + module_name;
    // document.getElementById('9').href = url_9 + "module=" + module_name;
    document.getElementById('module_name').innerHTML = module_title;
    document.getElementById('odoo_version').innerHTML = "Odoo "+odoo_version;
  toggleme('capture-menu', 'show');
  toggleme('capture-menu1', 'none');
  // console.log(document.getElementById('module_name'));
}
}

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });


document.addEventListener('DOMContentLoaded', function() {

  getCurrentTabUrl(function(url, title) {
    splited_url = url.split('/');
    splited_title = title.split('|');

    // Put the image URL in Google search.
    renderStatus(splited_url[6],splited_url[5], splited_title[0]);

  }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage, "", "");
    });
  });