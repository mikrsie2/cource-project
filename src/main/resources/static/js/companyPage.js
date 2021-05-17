let modal = document.getElementById("photoShowingModal");
let modalImg = document.getElementById("modalPhoto");
let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

function enlarge_photo(photo_url) {
    modal.style.display = "block";
    modalImg.src = photo_url;
}


function add_bonus(companyName) {

    $('#addBonus').modal('hide');
    $('.modal-backdrop').hide();

    let bonus = {
        "name": $('#bonusName').val(),
        "info": $('#bonusInfo').val(),
        "price": $('#bonusPrice').val(),
        "companyName": companyName
    }

    $.ajax({
        type: "POST",
        url: "/api/bonus",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(bonus),
        cache: false,
        timeout: 600000,
        success: function () {
            $('#bonuses').append('<button class="btn btn-light w-100">' + bonus.info + '</button>')
        },
    });
}

function add_post(companyName) {
    $('#addPost').modal('hide');
    $('.modal-backdrop').hide();

    let post = {
        "name": $('#postName').val(),
        "text": $('#postText').val(),
        "companyName": companyName
    }

    $.ajax({
        type: "POST",
        url: "/api/post",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(post),
        dataType: 'text',
        cache: false,
        timeout: 600000,
        success: function (data) {
            $('#posts').prepend('<div id="' + data + '">\n' +
                '                                        <div class="row comment mt-3">\n' +
                '                                            <div class="col align-self-center">\n' +
                '                                                <h5 class="d-flex">' + post.name + '</h5>\n' +
                '                                            </div>\n' +
                '                                            <div class="row">\n' +
                '                                                <div class="col-sm-1">\n' +
                '                                                </div>\n' +
                '                                                <div class="col align-self-center">\n' +
                '                                                    <h6 class="fs-6">' + post.text + '</h6>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>' +
                '                                           <div class="row mt-2 mt-2">\n' +
                '                                            <div class="col">\n' +
                '                                                <div class="form-floating">\n' +
                '                                            <textarea class="form-control" placeholder="Leave a comment here"\n' +
                '                                                      id="floatingTextarea"></textarea>\n' +
                '                                                <label for="floatingTextarea">Comment</label>\n' +
                '                                            </div>\n' +
                '                                            </div>\n' +
                '                                            <div class="col-sm-2 align-self-center">\n' +
                '                                                <button class="btn btn-primary">comment</button>\n' +
                '                                            </div>\n' +
                '                                        </div>')
        },
    });
}

function send_comment(id, company_id) {
    get_current_user(id, company_id)
}


function get_current_user(id, company_id) {
    $.ajax({
        type: "GET",
        url: "/api/current-user",
        dataType: 'text',
        contentType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let user = JSON.parse(data)
            continue_sending(id, company_id, user)
        },
        error: function (e) {
            //TODO
        }
    });

}

function continue_sending(id, company_id, user) {
    console.log(user.photoUrl)
    let comment_user = {
        "text": $('#text' + id).val(),
        "userId": user.id,
        "companyId": company_id,
        "postId": id
    }
    $.ajax({
        type: "POST",
        url: "/api/comment",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(comment_user),
        dataType: 'text',
        cache: false,
        timeout: 600000,
        success: function (data) {
            $('#' + id).append('<div>\n' +
                '                                                <div class="mx-5 row comment">\n' +
                '                                                    <div class="col-sm-1">\n' +
                '                                                        <img class="rounded-circle" width="30" height="30"\n' +
                '                                                             src="' + user.photoUrl + '"\n' +
                '                                                             alt="photo">\n' +
                '                                                    </div>\n' +
                '                                                    <div class="col align-self-center">\n' +
                '                                                        <h5 class="d-flex">' + user.username + '</h5>\n' +
                '                                                    </div>\n' +
                '                                                    <div class="row">\n' +
                '                                                        <div class="col-sm-1">\n' +
                '                                                        </div>\n' +
                '                                                        <div class="col align-self-center">\n' +
                '                                                            <h6 class="fs-6">' + comment_user.text + '</h6>\n' +
                '                                                        </div>\n' +
                '                                                    </div>\n' +
                '                                                </div>\n' +
                '                                            </div>')
        },
    });
}

