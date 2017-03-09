import FileSaver from 'file-saver'; 
import data from '../../public/resources/dataset/restaurants_list.json';
import info from '../../public/resources/dataset/restaurants_info.json';

var arrayList = [];
    var obj = {};
    for(var i=0; i<dataLong.length; i++) { 
        for(var j=0; j<info.length; j++){ 
            if(data[i].objectID === info[j].objectID){
                obj = {};
                obj.objectID = data[i].objectID;

                // rest_list has properties: name, image_url, payment_options, geoloc 
                obj.name = data[i].name;
                obj.image_url = data[i].image_url;
                obj.payment_options = data[i].payment_options;
                obj._geoloc = data[i]._geoloc;

                // rest_info has properties: food_type, stars_count, reviews_count, neighborhood, price_range
                obj.food_type = info[j].food_type;
                obj.stars_count = info[j].stars_count;
                obj.reviews_count = info[j].reviews_count;
                obj.neighborhood = info[j].neighborhood;
                obj.price_range = info[j].price_range;
                arrayList.push(obj);
            }
         }

    }
    
//CONVERTED MERGED DATA SOURCES INTO ONE FILE
var jsonArray = JSON.stringify(arrayList)    
var blob = new Blob([jsonArray], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "restaurants_complete.json");