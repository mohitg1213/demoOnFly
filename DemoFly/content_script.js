var baseURI = 	window.location.href;
var result	=	false;
var downloadurl, odoo_version, module_title, demoUrl, downloadurl, category, author;
var all_odoo_versions = ["10.0","9.0","8.0","7.0","6.0","6.1","5.0","online","master" ]
Array.prototype.contains = function ( needle ) {
   for (i in this) {
      if (this[i] == needle) return true;
   }
   return false;
}
try {
		if ((baseURI.startsWith("https://www.odoo.com")) || (baseURI.startsWith("https://apps.odoo.com"))){
					odoo_version = baseURI.split('/');
					if ((odoo_version.length > 5)  && (all_odoo_versions.contains(odoo_version[5])))
					{
						if (["10.0","9.0"].contains(odoo_version[5]))
						{
							author = document.querySelectorAll("span[itemprop='author']")[0].innerText
							downloadurl = document.querySelectorAll("a[itemprop='downloadUrl']")
							if ((downloadurl.length == 0) && (!author.startsWith("Webkul")))
								result = ["Demo is available for FREE modules only !!!"];
							else{
								module_name = baseURI.split('/')[6];
								// module_title = document.querySelectorAll("h1[class='mt0 mb0']")[0].innerText;
								module_title = document.title.split("|")[0];
								if (author.startsWith("Webkul")){
									demo_url = document.querySelectorAll("a[class='btn btn-primary mb16']");
									if (demo_url.length>1)
										demoUrl = demo_url[1].href
									if (!demoUrl)
										demoUrl = "http://odoodemo.webkul.com/waiting?step=2&version=latest&module="+module_title;
								}
								else
									demoUrl		= "http://odoodemo.webkul.com/?ext=1&version="+odoo_version[5]+"&module="+module_name;
								result 		= [demoUrl, "ODOO "+odoo_version[5], module_title];
							}
						}
						else
							result = ["Currently, Demo is available only for version 9.0 & 10.0"];
					}	
					else
						result = ["You need to go on product page in order to check demo."];
		}
		else if ((baseURI.startsWith("https://www.webkul.com")) || (baseURI.startsWith("https://store.webkul.com"))){
			try
			{
				// module_title = document.getElementsByClassName('product-name')[0].innerText;
				module_title = document.title.split("|")[0];
				module_title = module_title.split("-")[0];
				demoUrl = document.getElementsByClassName('wk-demo-button')[0].children[0].getAttribute("href");
				if (demoUrl=="#"){
					demoUrl = "http://odoodemo.webkul.com/waiting?step=2&version=latest&module="+module_title;
				}
				category = document.getElementsByClassName('grid-full breadcrumbs')[0].innerText.split('/')[1];
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