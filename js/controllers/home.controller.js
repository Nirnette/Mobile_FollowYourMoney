/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($state,$scope,CategoriesService, UserFactory, LocalStorageFactory){

	//Stockage du this
	var home  = this;
	var myApp = new Framework7({
	  angular : true
	});

    home.head = {
		date      : "Date",
		name      : "Expense",
		montant   : "Cost",
	};

	$scope.user 		   = UserFactory.getUser();
	$scope.categories      = CategoriesService.categories;
	$scope.catIcons        = CategoriesService.icons;

	var storagedDatas = LocalStorageFactory.getItem('followyourmoney');

	home.body = storagedDatas.datas;

    home.sort = {
        column: 'date',
        descending: true
    };

	home.showModal = function($event,id){

		var expense = undefined;
		var index   = undefined;

		for(data in home.body){

			if(home.body[data].id == id){
				expense = home.body[data];
				index = data;
				break;
			}
		}

		if(expense !== undefined){

			var date = expense.date.split('-').reverse().join('/');
			var html =  "<b>Cost</b> : <span class='costLabel'>"+expense.cost+' €</span><br>';
			html += "<b>Done at</b> : "+expense.location+'<br>';
			html += "<b>On</b> : "+date+'<br>';
			html += "<b>Category</b> : "+expense.category+'<br>';

			if(expense.comment.length > 0)
				html += "<b>Comment</b> : "+expense.comment+'<br>';
		}

		var nameModal = '<i class="fa '+$scope.catIcons[expense.category]+'" aria-hidden="true"></i>  '+expense.name;

		myApp.modal({
		    title:  nameModal,
		    text: html,
		    buttons: [
			    {
			        text: 'Delete',
			        onClick: function() {
			            myApp.confirm('Are you sure you want to delete the expense <b class="deleteLabel">'+expense.name+'</b> ?','Confirmation', function () {
			            	if(index !== undefined){
						    	storagedDatas.datas.splice(index,1);
						    	LocalStorageFactory.setItem('followyourmoney',storagedDatas);
						    	myApp.alert('The expense has been deleted with success', 'Success Delete !');
						    	$event.currentTarget.parentElement.remove();
			            	}else{
			            		myApp.alert('Error while deleting', 'Error');
			            	}

					    });
			        },
			    },
			    {
			        text: 'Edit',
			        onClick: function() {
			        	$state.go("form", {'expense' : expense});
			        },
			    },
			    {
			        text: 'Close',
			    },
		    ]
		});
	};


    $scope.selectedProp = 'date';
    $scope.isReversed = true; 

    $scope.changeOrder = function(prop) {
    	if(prop == 'Expense'){
    		$scope.selectedProp = 'name';
    	}else{
        	$scope.selectedProp = prop.toLowerCase();
    	}
        $scope.isReversed = !$scope.isReversed;
    };

    $scope.customFilter = function(element) {

        var val = ($scope.modelCategory) ? $scope.modelCategory : 'all';

        if (val != "all") {
        	var cat = element.category;
        	if(val == cat){
				return true;
			}else{
                return false;
			}

        } else {
            return true;
        }
    };

    $scope.customDateFilter = function(element) {

        var valFilter = ($scope.modelDate) ? $scope.modelDate : 'all';

        if (valFilter != "all") {
        	var date = element.date;

        	var dateElem = element.date;
        	if(typeof dateElem == 'string'){
				var d = dateElem.split('-');
				var dateElem = new Date(d[0], d[1]-1, d[2]);
			}

			var dateToCompare = null;

			switch(valFilter) {
			    case 'today':
			        dateToCompare = new Date();

			        if(dateToCompare.getFullYear() == dateElem.getFullYear() && 
			           dateToCompare.getMonth() == dateElem.getMonth() &&
			           dateToCompare.getDate() == dateElem.getDate()
			       	){
			        	return true;
			       	}else{
			       		return false;
			       	}

			        break;
			    case 'thisweek':
			    	dateToCompare = new Date();

			    	dateElem.setHours(00,00);

			    	var curr_date = new Date();
			    	curr_date.setHours(00,00);
                 
			        var day = curr_date.getDay();
			                 
			        var diff = curr_date.getDate() - day + (day == 0 ? -6:1); 
			        var week_start_tstmp = curr_date.setDate(diff-1);           

			        var week_start = new Date(week_start_tstmp);
			        week_start.setHours(00,00);         
			        var week_end  = new Date(week_start_tstmp); 
			                 
			        week_end = new Date (week_end.setDate(week_end.getDate() + 7));
			        week_end.setHours(00,00);             

			        if(dateElem.getTime() >= week_start.getTime() && dateElem.getTime() <= week_end.getTime()){
			        	return true;
			       	}else{
			       		return false;
			       	}
			        
			        break;
			    case 'thismonth':
			    	dateToCompare = new Date();

			    	if(dateToCompare.getFullYear() == dateElem.getFullYear() && 
			           dateToCompare.getMonth() == dateElem.getMonth() 
			       	){
			        	return true;
			       	}else{
			       		return false;
			       	}
			    	break;
			    default:
			    	return true;
			}

        } else {
            return true;
        }
    };

    $scope.classHeader = function(element){

        var cldefault = $scope.selectedProp;
        var elem_entre = element.toLowerCase();

        if((elem_entre == 'expense' && cldefault == 'name') || (elem_entre == cldefault)){

            retourClass="label-cell sortable-cell sortable-active";

            if($scope.isReversed === true){
                retourClass += " sortable-asc";
	        }else{
	        	retourClass += " sortable-desc";
	        }

        }else{
            retourClass="label-cell sortable-cell";
        }


        return retourClass;

    };
});
