let tempName = (foodData) => {
    // which ingrediant to search for
    // url stuffs
    let apiInfo = {
        key: 'ff2e56199c3ca1c897bcdae2d4f3d7a9',
        ID: '126bfcd4'
    };

    $.ajax({
        url: 'https://api.edamam.com/api/nutrition-data?app_id=' + apiInfo.ID + '&app_key=' + apiInfo.key +
            '&ingr=' + '1%20large%20apple',
        type: 'GET'
    })
        .fail(err => { console.log(err); })
        .done(res => {
            // test
            console.log(res);
            // if succeed
        });
}

tempName('something');