
chrome.tabs.executeScript( null, {file: "content_script.js"} );

chrome.runtime.onMessage.addListener(function(result) {
  if (result.length>1)
      renderStatus(result[0], result[1], result[2]);
  else if (result.length==1){
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
      document.getElementById('txt_copy').value = demo_url;
      document.getElementById('module_name').innerHTML = module_title;
      document.getElementById('odoo_version').innerHTML = framework;
      toggleMe('capture-menu', 'block');
      toggleMe('capture-menu1', 'none');
}

var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  document.getElementById("txt_copy").select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    self.close()
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});