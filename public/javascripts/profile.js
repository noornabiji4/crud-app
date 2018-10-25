profile = [];
profile.database = {};

const loadAssets = function () {
    $.getJSON("/profile/", function (data) {
        profile.database = data;
        console.log(data);
        profile.init();

    })
}
profile.init = function () {
    profile.update ();
    profile.new();
    profile.delete();
    profile.generateMarkup()
};
profile.new = function(){
    $(".new").on("click", function (){
        // console.log(id._id);
        $("#addProfile").show();
        window.location = '/profile'
    })
}
profile.update = function (){
    $(".update").on('click', function (){
        $('#addU').show()
        $('#addU').submit(function (e){
            e.preventDefault();
            $.post({
                url : "/profile/" +id._id,
                type: "PUT",
                data:{
                    fullName : $('#add1').val(),
                    emailId : $('#add2').val(),
                    phoneNumber:$('#add3').val(),
                    address : $('#add4').val(),
                    image : $('#add5').val()
                }
            });
            window.location = '/home'
        });
    });
}



profile.delete= function (){
    $(".delete").on("click", function (){
        // console.log(id._id)
        url = "/profile/" +id._id;
        $.post({
            url: url,
            method: "DELETE"
        });
        window.location = '/home'
        

    })
}

profile.generateMarkup = function () {
    var template = "";

    $.each(profile.database, function (index) {
        db = profile.database;
        id = db[index];
        // console.log(id);

        template += '<div class="card" style="width: 18rem;">'
        template += '<img class="card-img-top" src="'+id.image+'" alt="Card image cap">'
        template += '<div class="card-body">'
        template += '<h5 class="card-title">'+id.fullName+'</h5>'
        template += '<p>'+id.emailId+'</p>'
        template += '<p>'+id.phoneNumber+'</p>'
        template += '<p>'+id.address+'</p>'
        template += '<button class="update btn btn-primary">Update Profile</button>'
        template += '<button class="delete btn btn-primary">Delete</button>'
        template += '</div>'
        template += '</div>'

    })
    $(".content").append(template);
    profile.delete();
    profile.new ();
    profile.update ();
}
loadAssets();