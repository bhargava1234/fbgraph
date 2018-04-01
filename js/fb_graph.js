$(document).ready(() => {

		$('#login').click(()=>{
			
				 $.token=$("#user_token").val();  
				 if($.token.length < 6) {
				  
				  alert("Token Is not valid")
				 
				 } 	
				 
				 else {
						 
				   getProfileData(); 
				}
		})// end get data 
		
		 $('#get_feed').click(()=>{
			 
			 getfeedData()
			 
		})// end get data 

}); // end of document.ready()

let getProfileData = () => {

    console.log("making request")

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
  				
  		},
        error: (response) => { // in case of error response

            alert("some error occured")

        },

        beforeSend: () => { // while request is processing.

            // you can use loader here.
            alert("request is being made. please wait")

        },
        complete: () => {

            // what you want to do while request is completed
            alert("data fetched success")

        },

        timeout:3000 // this is in milli seconds

    }); // end of AJAX request

} // end of getAllData



let getfeedData = () => {
	

					$.ajax({
						method:"GET",
						url:"https://graph.facebook.com/v2.9/me/?fields=feed.limit(4)&access_token="+$.token,
						success:function(response){
							console.log(response);
							var feed = response.feed.data;
							var content = "<table class='table'><tr><th>Story</th><th>Message</th></tr>"
								for (let i in feed){
								     var mess = feed[i].message ? feed[i].message : "No Message";
									content += '<tr><td> ' +  feed[i].story + '</td><td> ' +  mess + '</td></tr>';
								}
								content += "</table>"

								$('#here_table').html(content);
						},
						
						error: (response) => { 

							alert("some error occured")

						}
					});
				
	
}

	
	
