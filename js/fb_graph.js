$(document).ready(function(){
	
  //login and get user details

  $("#login").click(function(){
  	$.token=$("#user_token").val();
   if($.token.length<6){
  		alert("Token Is not valid")
  	} 
	else {
  		$.ajax({
  			url:'https://graph.facebook.com/me?fields=id,email,name,birthday,picture.height(400),cover,gender,hometown,age_range,first_name,middle_name,last_name&access_token='+$.token,
  			dataType:'JSON',
  			method:'GET',
  			success:function(response){
  				console.log(response);
				
  				var firstname=response.first_name;
				var lastname=response.last_name;
				var birthday=response.birthday;
				var gender=response.gender;
				var email=response.email;
				if (response.hometown !== undefined){
				var hometown=response.hometown.name;
				}
				else{
					var hometown='no hometown';
				}
				var pic=response.picture.data.url;
				
				var fullname=firstname+' '+lastname;
  				
  				//$("#loginbutton").hide();
  				//$("#user").show();
  				//$("#logoutbutton").show();
  				$("#fullname").text(fullname);
				$("#dob").text(birthday);
				$("#gender").text(gender);
				$("#email").text(email);
				$("#hometown").text(hometown);
				$("#pro_pic").attr("src",pic);
  				$("#fade-wrapper").css('display','none');
  				
  			}
			,error : function(request,errorType,errorMessage){
			                    console.log(request);
			                    console.log(errorType);
								 alert("Wrong Access token !");
			                }
  		});
  		
  		
  	}
	
});

  //get feed

			$("#get_feed").click(function(){
					$.ajax({
						method:"GET",
						url:"https://graph.facebook.com/v2.9/me/?fields=feed.limit(4)%7Bfrom%2Cmessage%7D&access_token="+$.token,
						success:function(response){
							console.log(response);
							var feed = response.feed.data;
							var content = "<table class='table'>"
								for (let i in feed){
								     var mess = feed[i].message ? feed[i].message : "No Message";
									content += '<tr><td> ' +  feed[i].from.name + '</td><td> ' +  mess + '</td></tr>';
								}
								content += "</table>"

								$('#here_table').html(content);
						}
					});
				});		
});	
	
	