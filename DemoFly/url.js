
chrome.tabs.executeScript( null, {file: "content_script.js"} );

chrome.runtime.onMessage.addListener(function(result) {
  if (result.length>1)
      renderStatus(result[0], result[1], result[2]);
  else {
        document.getElementById('custom_message').innerHTML = result[0];
        toggleMe('capture-menu1', 'none');
        toggleMe('capture-menu2', 'block');
      }
});

function toggleMe(element_id, value='none'){
  document.getElementById(element_id).style.display = value;
}

function renderStatus(demo_url, framework, module_title) {

      document.getElementById('10').href = demo_url;
      document.getElementById('module_name').innerHTML = module_title;
      document.getElementById('odoo_version').innerHTML = framework;
      toggleMe('capture-menu', 'block');
      toggleMe('capture-menu1', 'none');
}