/*********************** Controller de la home page ****************/

app.controller('HomeCtrl',function($rootScope){

	//Stockage du this
	var home = this;

    home.head ={
			date:"Date",
			name: "Titre",
			montant: "Montant",
			categorie: "Categorie"
		};

	home.body =[{
			date: "10/05",
			name: "Cinema Star Trek",
			montant: "15",
			categorie: "cinema"
		},{
			date: "08/05",
			name: "Theatre La luciernaga",
			montant: "10",
			categorie: "Theatre"
		},
			{
				date: "09/05",
				name: "Parque Asterix",
				montant: "55",
				categorie: "Parque"
			}
		];

    home.sort = {
        column: 'montant',
        descending: false
    };

    home.selectedCls = function(column) {
        return column == home.sort.column && 'sort-' + home.sort.descending;
    };

    home.changeSorting = function(column) {
        var sort = home.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
 };
})
