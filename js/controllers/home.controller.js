/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($state,$scope,CategoriesService, NotificationFactory, UserFactory, LocalStorageFactory){

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
			        }
			    },
			    {
			        text: 'Edit',
			        onClick: function() {
			        	$state.go("form", {'expense' : expense});
			        }
			    },
			    {
			        text: 'Close',
			        bold: true,
			    },
		    ]
		});
	};


    $scope.selectedProp = 'date';
    $scope.isReversed = true; 

    $scope.changeOrder = function(prop) {
        $scope.selectedProp = prop.toLowerCase();
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

    $scope.classHeader = function(element){

        var cldefault = $scope.selectedProp;
        var elem_entre = element.toLowerCase();

        if(elem_entre == cldefault){

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
