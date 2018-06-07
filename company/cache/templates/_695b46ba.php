<?php defined('IN_MET') or exit('No permission'); ?>
<?php
    $cid = 0;
    if($cid == 0){
        $cid = $data['classnow'];
    }
    $num = $c['met_download_list'];
    $order = "no_order";
    $result = load::sys_class('label', 'new')->get('download')->get_list_page($cid, $data['page']);
    $sub = count($result);
     foreach($result as $index=>$v):
        $v['sub']      = $sub;
        $v['_index']   = $index;
        $v['_first']   = $index == 0 ? true:false;
        $v['_last']    = $index == (count($result)-1) ? true : false;
?>
<li class="list-group-item">
	<div class="media">
		<div class="media-left p-r-5 p-l-10 hidden-xs-down">
			<a href="<?php echo $v['url'];?>" <?php echo $v['urlnew'];?> title="<?php echo $v['title'];?>" target="<?php echo $lang['met_listurlblank'];?>">
				<i class="icon fa-file-archive-o blue-grey-400"></i>
			</a>
		</div>
		<div class="media-body">
			<a class="btn btn-outline btn-primary btn-squared pull-xs-right" href="<?php echo $v['downloadurl'];?>" title="<?php echo $v['title'];?>" target="_blank"><?php echo $lang['download'];?></a>
			<h4 class="media-heading font-size-16">
				<a class="name" href="<?php echo $v['url'];?>" <?php echo $v['urlnew'];?> title="<?php echo $v['title'];?>" target='_self'><?php echo $v['title'];?></a>
			</h4>
			<small class='font-size-14 blue-grey-500'>
				<span><?php echo $v['filesize'];?> kb</span>
				<span class="m-l-10"><?php echo $v['updatetime'];?></span>
			</small>
		</div>
	</div>
</li>
<?php endforeach;?>