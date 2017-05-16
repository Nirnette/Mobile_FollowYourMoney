
/************** Gmail Auth Factory FACTORY ********************/
app.factory('GmailAuthFactory', function($state){

	var getClientID = function(){
		return '445913378547-81eptei3akg63l5aumms2f82s78j5hbj.apps.googleusercontent.com';
	}
	
	/**
      *  On load, called to load the auth2 library and API client library.
    */ 
	var handleClientLoad = function(){
		gapi.load('client:auth2', initClient);
	}

   /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
	var initClient = function () {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
    }

	 /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
    var updateSigninStatus = function(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listLabels();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
    }

     /**
      *  Sign in the user upon button click.
      */
	var handleAuthClick = function(event) {
		gapi.auth2.getAuthInstance().signIn();
	}

	/**
	*  Sign out the user upon button click.
	*/
	var handleSignoutClick = function(event) {
		gapi.auth2.getAuthInstance().signOut();
	}

    /**
    * Append a pre element to the body containing the given message
    * as its text node. Used to display the results of the API call.
    *
    * @param {string} message Text to be placed in pre element.
   */
    var appendPre = function(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    /**
      * Print all Labels in the authorized user's inbox. If no labels
     * are found an appropriate message is printed.
     */
    var listLabels = function() {
        gapi.client.gmail.users.labels.list({
          'userId': 'me'
        }).then(function(response) {
          var labels = response.result.labels;
          appendPre('Labels:');

          if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
              var label = labels[i];
              appendPre(label.name)
            }
          } else {
            appendPre('No Labels found.');
          }
        });
    }


	return{
		getClientID : getClientID,
		handleClientLoad : handleClientLoad,
		initClient : initClient,
		updateSigninStatus:updateSigninStatus,
		handleAuthClick:handleAuthClick,
		handleSignoutClick:handleSignoutClick,
		appendPre:appendPre,
		listLabels:listLabels
	}

});