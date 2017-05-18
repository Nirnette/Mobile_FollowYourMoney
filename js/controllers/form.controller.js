/*********************** Controller de la page de formulaire ****************/

app.controller('FormCtrl',function($http,$state,$scope,CategoriesService,LocalStorageFactory,LocationFactory){

	//Stockage du this
	var form = this;
	var myApp = new Framework7();

	form.categories = CategoriesService.categories;

	form.name 	        = '';
	form.category       = '';
	form.date           = new Date();
	form.cost           = '';
	form.location       = '';
	form.comment        = '';

	LocationFactory.getTown().then(function(location) {
		form.location = location
    });

	 //Envoyer un message au chat
	form.submit = function(){

		//Validations des datas
		if(form.name.length > 0 && form.category.length > 0 && form.date !== undefined && form.cost > 0){

			var month = form.date.getMonth()+1;
			month = month < 10 ? '0'+month : month;
			var date = form.date.getFullYear()+'-'+month+'-'+form.date.getDate();

			var newExpense = {
				id           : new Date().getTime(),
				name         : form.name,
				category     : form.category,
				date 	     : date,
				cost         : form.cost,
				location     : form.location,
				comment      : form.comment,
			};

			var storagedDatas = LocalStorageFactory.getItem('followyourmoney');

			if(storagedDatas.userdata !== undefined && storagedDatas.datas !== undefined){
				storagedDatas.datas.push(newExpense);

				LocalStorageFactory.setItem('followyourmoney',storagedDatas);

				var storagedDatas2 = LocalStorageFactory.getItem('followyourmoney');

				myApp.alert('Expense added !',"Success");

				$state.go('home');
			}
		}else{

			if(form.name.length == 0){
				$('#name').addClass('error');
				$('#name_label').addClass('error-label');
			}else{
				$('#name').removeClass('error');
				$('#name_label').removeClass('error-label');
			}

			if(form.category.length == 0){
				$('#category').addClass('error');
				$('#category_label').addClass('error-label');
			}else{
				$('#category').removeClass('error');
				$('#category_label').removeClass('error-label');
			}

			if(form.date == undefined){
				$('#date').addClass('error');
				$('#date_label').addClass('error-label');
			}else{
				$('#date').removeClass('error');
				$('#date_label').removeClass('error-label');
			}

			if(form.cost == undefined || form.cost <= 0){
				$('#cost').addClass('error');
				$('#cost_label').addClass('error-label');
			}else{
				$('#cost').removeClass('error');
				$('#cost_label').removeClass('error-label');
			}

			myApp.alert('Please correct the errors on the form','Error Validation Form !');
		}
	}
	
});