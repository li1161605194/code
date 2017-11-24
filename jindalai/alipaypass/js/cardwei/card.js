$(function(){
    $(document).on('click','#J_viewTab li a',function(){
        $("#J_viewTab li").removeClass("selected");
        $(this).parent().addClass("selected");

        $(".J_preview").removeClass('active');
        $("#J_viewId_"+$(this).attr('data-view')).addClass('active');

    })
})

















