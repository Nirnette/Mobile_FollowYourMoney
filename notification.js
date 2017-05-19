/**
 * Created by root on 18/05/17.
 */

// Création de la somme des dépense du jour
function getTotal(){
    var total = 0;
    if (window.localStorage != null && window.localStorage != undefined){
        storageData = window.localStorage.getItem('followyourmoney');
        storageData = JSON.parse(storageData);
        var today = new Date();
        var month = today.getMonth()+1;
        month = month < 10 ? '0'+month : month;
        today = today.getFullYear()+'-'+month+'-'+today.getDate();
        if (storageData != null && storageData != undefined){
            for (var i =0; i < storageData.datas.length ; i++){
                var expense = storageData.datas[i];
                if (expense.date == today){
                    total+= expense.cost;
                }
            }
        }
    }
    return total;
}

var accepted = false;
setInterval(function(){
    if (accepted == true){
        const title = 'Daily expenses update';
        const options = {
            body: 'Vous avez dépensé : '+getTotal()+'€ aujourd\'hui',
            icon: 'icon.png',
            // badge: 'images/badge.png'
        };
        new Notification(title, options);
    } else {
        Notification.requestPermission().then(function(result) {
        });
        accepted = true;
    }
}, 60000);