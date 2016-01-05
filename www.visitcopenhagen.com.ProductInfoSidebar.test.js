
var cheerio = require('cheerio');
var store = require('./store.js');
var fs = require('fs');
var colors = require('colors');

html = `
<section class="ProductInfoSidebar clearfix"> <div class="TellusProductContacts"><h3>Contact</h3><div class="TellusProductContacts-item"><h4>Address</h4><div class="TellusProductContacts-item-right"><div>Strandvejen 550</div><div>2930 Klampenborg</div></div></div><div class="TellusProductContacts-item"><h4>Web</h4><div class="TellusProductContacts-item-right"><a href="http://www.cottagerne.dk" rel="nofollow" target="_blank" onclick="dataLayer.push({'eventcategory': 'External links', 'eventaction': 'www.cottagerne.dk', 'eventlabel': 'undefined', 'event': 'eventga'});">www.cottagerne.dk</a></div></div><div class="TellusProductContacts-item"><h4>Email</h4><div class="TellusProductContacts-item-right"><a href="mailto:info@denrodecottage.dk" onclick="dataLayer.push({'eventcategory': 'Email', 'eventaction': 'info@denrodecottage.dk','event': 'eventga'});">info@denrodecottage.dk</a></div></div><div class="TellusProductContacts-item"><h4>Phone</h4><div class="TellusProductContacts-item-right"><span class="TellusPhonePrefix">+45</span> 3990 4614</div></div></div><div class="ProductTripadvisor"><iframe src="http://www.tripadvisor.com/WidgetEmbed-cdspropertysummary?display=true&amp;isTA=true&amp;partnerId=7183A2422742427DBB2F718F5345CF36&amp;lang=en&amp;locationId=2664783" width="100%" height="80" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe><a href="http://www.tripadvisor.com/Restaurant_Review-g2213348-d2664783-Reviews-Den_Rode_Cottage-Klampenborg_Lyngby_Taarbak_Municipality_Copenhagen_Region_Zeala.html" class="woco-link-arrow" target="_blank" onclick="dataLayer.push({'eventcategory': 'External links', 'eventaction': 'www.tripadvisor.com', 'eventlabel': '/Restaurant_Review-g2213348-d2664783-Reviews-Den_Rode_Cottage-Klampenborg_Lyngby_Taarbak_Municipality_Copenhagen_Region_Zeala.html', 'event': 'eventga'});">See all reviews</a></div><div class="FacilityCategoryList"><h3>Facilities</h3><ul><li><h4 class="expanded">City / Area</h4><ul style="display: block;"><li>Espergærde</li></ul></li><li><h4 class="expanded">Classification</h4><ul style="display: block;"><li>Michelin</li></ul></li><li><h4 class="expanded">Price level</h4><ul style="display: block;"><li>top end</li></ul></li></ul></div></section>`
function getContactRight(name,$){
    var a = $("H4:contains('" + name + "')")
    a.map(function (i, v) {
        var x = $(this.parent).find(".TellusProductContacts-item-right");
        var data = ""
        x.map(function (i,div)
        {
            child = $(this);
            console.log(name,child.text().inverse);
            data += child.text();
        })
        return data;    
    });
    
}

console.log("start".green);
$ = cheerio.load(html);

store.getContactRight("Address",$);
store.getContactRight("Web",$);
store.getContactRight("Email",$);
store.getContactRight("Phone",$);



console.log("done".green);       
