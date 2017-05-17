/**
 * Created by root on 16/05/17.
 */
app.service('CategoriesService', function(){
    this.categories = [
    	'Grocery',
    	'Shopping',
    	'Restoration',
    	'Outings',
    	'Holidays',
    	'Vehicle',
    	'Other'
    ];

    this.icons = {
    	'Grocery'      :'fa-shopping-cart',
    	'Shopping'     :'fa-shopping-bag',
    	'Restoration'  :'fa-cutlery',
    	'Outings'      :'fa-users',
    	'Holidays'     :'fa-plane',
    	'Vehicle'      :'fa-car',
    	'Other'        :'fa-list'
    };
});