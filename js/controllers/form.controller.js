/*********************** Controller de la page de formulaire ****************/

app.controller('FormCtrl',function($http,$state, $stateParams,$scope,CategoriesService,LocalStorageFactory,LocationFactory){

	//Stockage du this
	var form = this;
	var myApp = new Framework7();

	var editDatas = $stateParams.expense;
	
	form.categories = CategoriesService.categories;

	var dateEdit = null;

	if(editDatas !== null){

		form.submitButton = "Edit";
		form.title 		  = "Edit";

		var dateEdit = editDatas.date;

		if(typeof editDatas.date == 'string'){
			var d = editDatas.date.split('-');
			var dateEdit = new Date(d[0], d[1]-1, d[2]);
		}
	}else{
		form.submitButton = "Save";
		form.title 		  = "New";
	}

	form.name 	        = editDatas !== null ? editDatas.name : '';
	form.category       = editDatas !== null ? editDatas.category : '';
	form.date           = editDatas !== null ? dateEdit : new Date();
	form.cost           = editDatas !== null ? editDatas.cost : '';
	form.location       = editDatas !== null ? editDatas.location : '';
	form.comment        = editDatas !== null ? editDatas.comment : '';

	if(editDatas == null){
		LocationFactory.getTown().then(function(location) {
			form.location = location
	    });
	}

	 //Envoyer un message au chat
	form.submit = function(){

		//Validations des datas
		if(form.name!== undefined && form.category !== undefined && form.date !== undefined && form.cost !== undefined && form.cost > 0){

			var month = form.date.getMonth()+1;
			month = month < 10 ? '0'+month : month;

			var day = form.date.getDate();
			day = day < 10 ? '0'+day : day;

			var date = form.date.getFullYear()+'-'+month+'-'+day;

			var storagedDatas = LocalStorageFactory.getItem('followyourmoney');
			var contexte = "added";

			//Edition
			if(editDatas !== null && editDatas.id !== undefined){

				contexte = "edited";

				var idx = null;
				for(index in storagedDatas.datas){
					if(storagedDatas.datas[index].id == editDatas.id){
						idx = index;
						break;
					}
				}

				if(idx !== null){
					storagedDatas.datas[idx].name     	= form.name;
					storagedDatas.datas[idx].category 	= form.category;
					storagedDatas.datas[idx].date 		= date;
					storagedDatas.datas[idx].cost 		= form.cost;
					storagedDatas.datas[idx].location 	= form.location;
					storagedDatas.datas[idx].comment 	= form.comment;
				}
			}
			//Création
			else{

				var newExpense = {
					id           : new Date().getTime(),
					name         : form.name,
					category     : form.category,
					date 	     : date,
					cost         : form.cost,
					location     : form.location,
					comment      : form.comment,
				};

			}

			if(storagedDatas.userdata !== undefined && storagedDatas.datas !== undefined){

				//Edition
				if(editDatas == null){
					storagedDatas.datas.push(newExpense);
				}

				LocalStorageFactory.setItem('followyourmoney',storagedDatas);

				myApp.alert('Expense '+contexte+' !',"Success");

				$state.go('home');
			}else{
				myApp.alert("Error while saving the expense",'Error');
			}
		}else{

			if(form.name== undefined || form.name.lenght == 0){
				$('#name').addClass('error');
				$('#name_label').addClass('error-label');
			}else{
				$('#name').removeClass('error');
				$('#name_label').removeClass('error-label');
			}

			if(form.category == undefined || form.category.length == 0){
				$('#category').addClass('error');
				$('#category_label').addClass('error-label');
			}else{
				$('#category').removeClass('error');
				$('#category_label').removeClass('error-label');
			}

			if(form.date == undefined || form.date == undefined){
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