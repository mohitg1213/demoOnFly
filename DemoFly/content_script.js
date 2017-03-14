var baseURI = 	window.location.href;
var result	=	false;
var module_name, odoo_version, module_title, demoUrl, downloadurl, category;
var all_odoo_versions = ["8.0","7.0","6.0","6.1","5.0","online","master" ]
Array.prototype.contains = function ( needle ) {
   for (i in this) {
      if (this[i] == needle) return true;
   }
   return false;
}
try {
		if ((baseURI.startsWith("https://www.odoo.com")) || (baseURI.startsWith("https://apps.odoo.com"))){
				if (baseURI.startsWith("https://www.odoo.com/apps/modules/10.0")){
					downloadurl = document.querySelectorAll("a[itemprop='downloadUrl']")
					if (downloadurl.length == 0)
						result = ["Demo is available for FREE modules only !!!"];
					else{
						module_name = baseURI.split('/')[6];
						module_title = document.querySelectorAll("h1[class='mt0 mb0']")[0].innerText;
						demoUrl		= "http://odoodemo.webkul.com/?ext=1&version=10.0&module="+module_name;
						result 		= [demoUrl, "ODOO 10.0", module_title];
					}
				}
				else if (baseURI.startsWith("https://www.odoo.com/apps/modules/9.0")){
					downloadurl = document.querySelectorAll("a[itemprop='downloadUrl']")
						if (downloadurl.length == 0)
							result = ["Demo is available for FREE modules only !!!"];
						else{
							module_name = baseURI.split('/')[6];
							module_title = document.querySelectorAll("h1[class='mt0 mb0']")[0].innerText;
							demoUrl		= "http://odoodemo.webkul.com/?ext=1&version=9.0&module="+module_name;
							result 		= [demoUrl, "ODOO 9.0", module_title];
						}
				}
				else{
					odoo_version = baseURI.split('/');
					if ((odoo_version.length > 5) && (all_odoo_versions.contains(odoo_version[5])) )
						result = ["Currently, Demo is available only for version 9.0 & 10.0"];
					else
						result = ["You need to go on product page in order to check demo."];
				}
		}
		else if ((baseURI.startsWith("https://www.webkul.com")) || (baseURI.startsWith("https://store.webkul.com"))){
			try
			{
				module_title = document.getElementsByClassName('product-name')[0].innerText;
				demoUrl = document.getElementsByClassName('wk-demo-button')[0].children[0].getAttribute("href");
				category = document.getElementsByClassName('grid-full breadcrumbs')[0].innerText.split('/')[1];
				console.log(category);
				result = [demoUrl, category, module_title];
			}
			catch(err) {
				result = ["You need to go on product page in order to check demo."];
			}		
		}
}
catch(err) {
	console.error(err);
}
finally {
	chrome.runtime.sendMessage(result);
}