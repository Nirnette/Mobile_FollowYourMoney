/**
 * Created by root on 18/05/17.
 */

////// SCRIPT PERMETTANT LES NOTIFICATIONS
// var applicationServerPublicKey = 'BE8FuBEft-HKJrMHeg8pPlhRLAMD94oWgColhIOhKLhTJoejrpucEIxF3QDd8MyVGD1VQq43l1cl31l3IHO0ywI';
//
// var pushButton = document.querySelector('.js-push-btn');
//
// var isSubscribed = false;
// var swRegistration = null;
//
// function urlB64ToUint8Array(base64String) {
//     var padding = '='.repeat((4 - base64String.length % 4) % 4);
//     var base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');
//
//     var rawData = window.atob(base64);
//     var outputArray = new Uint8Array(rawData.length);
//
//     for (var i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }
//
//
// function updateBtn() {
//     if (Notification.permission === 'denied') {
//         pushButton.textContent = 'Push Messaging Blocked.';
//         pushButton.disabled = true;
//         updateSubscriptionOnServer(null);
//         return;
//     }
//
//     if (isSubscribed) {
//         pushButton.textContent = 'Disable Push Messaging';
//     } else {
//         pushButton.textContent = 'Enable Push Messaging';
//     }
//
//     pushButton.disabled = false;
// }
//
// function initialiseUI() {
//     pushButton.addEventListener('click', function() {
//         pushButton.disabled = true;
//         if (isSubscribed) {
//             unsubscribeUser();
//         } else {
//             subscribeUser();
//         }
//     });
//     // Set the initial subscription value
//     swRegistration.pushManager.getSubscription()
//         .then(function(subscription) {
//             isSubscribed = !(subscription === null);
//
//             if (isSubscribed) {
//                 console.log('User IS subscribed.');
//             } else {
//                 console.log('User is NOT subscribed.');
//             }
//
//             updateBtn();
//         });
// }
//
// function subscribeUser() {
//     var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//     swRegistration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: applicationServerKey
//     })
//         .then(function(subscription) {
//             console.log('User is subscribed.');
//
//             updateSubscriptionOnServer(subscription);
//
//             isSubscribed = true;
//
//             updateBtn();
//         })
//         .catch(function(err) {
//             console.log('Failed to subscribe the user: ', err);
//             updateBtn();
//         });
// }
// function unsubscribeUser() {
//     swRegistration.pushManager.getSubscription()
//         .then(function(subscription) {
//             if (subscription) {
//                 return subscription.unsubscribe();
//             }
//         })
//         .catch(function(error) {
//             console.log('Error unsubscribing', error);
//         })
//         .then(function() {
//             updateSubscriptionOnServer(null);
//
//             console.log('User is unsubscribed.');
//             isSubscribed = false;
//
//             updateBtn();
//         });
// }
//
//
// function updateSubscriptionOnServer(subscription) {
//     // TODO: Send subscription to application server
//
//     var subscriptionJson = document.querySelector('.js-subscription-json');
//     var subscriptionDetails =
//         document.querySelector('.js-subscription-details');
//
//     if (subscription) {
//         subscriptionJson.textContent = JSON.stringify(subscription);
//         subscriptionDetails.classList.remove('is-invisible');
//     } else {
//         subscriptionDetails.classList.add('is-invisible');
//     }
// }

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
                // console.log(expense.date);
                if (expense.date == today){
                    total+= expense.cost;
                }
            }
        }
        console.log(total);
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
}, 100000000000000000);