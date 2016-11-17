$('body').on('submit','.FormUpload',function(e){
    e.preventDefault();  //prevent form normal submition
    
    //get progressbar label url_to_hit and form_reference into variables to be used below
    var pr = $(this).parents('.tabPanes').find('.progressBar');
    var lbl = $(this).parents('.tabPanes').find('.percentLabel');
    var url = $(this).attr('action');
    var frm = $(this);

    //populate formdata
    var data = new FormData();
    if(frm.find('#txtFile[type="file"]').length === 1 ){
        data.append('file', frm.find( '#txtFile' )[0].files[0]);
    }else{
        data.append('file', frm.find('#txtFile' ).val());
    }
    data.append('type',frm.find('#txtType').val());
    data.append('src',frm.find('#txtSrc').val());
    data.append('title',frm.find('#txtTitle').val());
    data.append('tags',frm.find('#txtTags').val());

    //prepare ajax and callback functions
    var ajax  = new XMLHttpRequest();
    ajax.upload.addEventListener('progress',function(evt){
        var percentage = (evt.loaded/evt.total)*100;
        pr.val(Math.round(percentage));
        lbl.html(Math.round(percentage)+'% uploaded.');
    },false);
    ajax.addEventListener('load',function(evt){
        lbl.html(evt.target.responseText);
        pr.val(0);
    },false);
    ajax.addEventListener('error',function(evt){
        lbl.html('upload failed');
        pr.val(0);
    },false);
    ajax.addEventListener('abort',function(evt){
        lbl.html('upload aborted');
        pr.val(0);
    },false);
    ajax.open('POST',url);
    ajax.send(data);

    //again stop form submition (optional)
    return false;
});
