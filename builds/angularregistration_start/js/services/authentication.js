myApp.factory('Authentication',
['$rootScope','$location','$firebaseAuth','$firebaseObject',
function($rootScope,$location,$firebaseAuth,$firebaseObject){
    var ref=firebase.database().ref(); 
    var auth=$firebaseAuth();

    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var userRef=ref.child('users').child(authUser.uid);
            var thisUser=$firebaseObject(userRef);
            $rootScope.currentUser=thisUser;
        }else{
            $rootScope.currentUser='';
        }
    });
    var myObject;
    myObject= {
        requireAuth:function(){
            return auth.$requireSignIn();
        },
        login: function(user){

            auth.$signInWithEmailAndPassword(
                user.email,
                user.password
            ).then(function(user){
                $location.path('/success');

            }).catch(function(error){
                $rootScope.message=error.message;
            });
        },
        logout: function(){
            return auth.$signOut();
        },
        register: function(user){
            auth.$createUserWithEmailAndPassword(
                user.email,
                user.password
            ).then(function(regUser){
                var regRef=ref.child('users')
                .child(regUser.uid).set({
                    date:firebase.database.ServerValue.TIMESTAMP,
                    regUser:regUser.uid,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email:user.email
                });
                myObject.login(user);
            }).catch(function(error){
                $rootScope.message=error.message;
            });
        }
    }
    return myObject;
}]);