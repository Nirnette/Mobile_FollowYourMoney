/**
 * Created by root on 16/05/17.
 */


/************** Notification FACTORY ********************/
app.factory('NotificationFactory', function($state){
    var sendNotification = function(text, minutes){
        setInterval( function(){
            function notifyMe() {
                // Voyons si le navigateur supporte les notifications
                if (!("Notification" in window)) {
                    return false;
                    //alert("Ce navigateur ne supporte pas les notifications desktop");
                }

                // Voyons si l'utilisateur est OK pour recevoir des notifications
                else if (Notification.permission === "granted" ) {
                    // Si c'est ok, créons une notification
                    var notification = new Notification(text);
                    return true;
                }

                // Sinon, nous avons besoin de la permission de l'utilisateur
                // Note : Chrome n'implémente pas la propriété statique permission
                // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
                else if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {

                        // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
                        if(!('permission' in Notification)) {
                            Notification.permission = permission;
                            return false;
                        }

                        // Si l'utilisateur est OK, on crée une notification
                        if (permission === "granted") {
                            var notification = new Notification(text);
                            return true;
                        }
                    });
                }

                // Comme ça, si l'utlisateur a refusé toute notification, et que vous respectez ce choix,
                // il n'y a pas besoin de l'ennuyer à nouveau.
            }
            var date = new Date();
            var hours = date.getHours();

//             if (hours == hour){
//                 // function notifyMe() {
//                     // Voyons si le navigateur supporte les notifications
//                     if (!("Notification" in window)) {
//                         return false;
//                         //alert("Ce navigateur ne supporte pas les notifications desktop");
//                     }

//                     // Voyons si l'utilisateur est OK pour recevoir des notifications
//                     else if (Notification.permission === "granted" ) {
//                         // Si c'est ok, créons une notification
//                         var notification = new Notification(text);
//                         return true;
//                     }

//                     // Sinon, nous avons besoin de la permission de l'utilisateur
//                     // Note : Chrome n'implémente pas la propriété statique permission
//                     // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
//                     else if (Notification.permission !== 'denied') {
//                         Notification.requestPermission(function (permission) {

//                             // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
//                             if(!('permission' in Notification)) {
//                                 Notification.permission = permission;
//                                 return false;
//                             }

//                             // Si l'utilisateur est OK, on crée une notification
//                             if (permission === "granted") {
//                                 var notification = new Notification(text);
//                                 return true;
//                             }
//                         });
//                     }

//                     // Comme ça, si l'utilisateur a refusé toute notification, et que vous respectez ce choix,
//                     // il n'y a pas besoin de l'ennuyer à nouveau.
//                 }
//             // }
//         }, 3600000);
            var minutes = date.getMinutes();
            if (minutes > 0 ){
                notifyMe();
                console.log('je rentre dans la notif');
            }
        }, 30000);
    };

    return {
        sendNotification: sendNotification
    }
});