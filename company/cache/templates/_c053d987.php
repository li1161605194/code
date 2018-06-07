<?php defined('IN_MET') or exit('No permission'); ?>
    <?php if($c['met_img_page'] && $data['sub']){ ?>
	<?php
    $type=strtolower(trim('son'));
    $cid=$data['classnow'];
    $column = load::sys_class('label', 'new')->get('column');
    
    unset($result);
    switch ($type) {
            case 'son':
                $result = $column->get_column_son($cid);   
                break;
            case 'current':
                $result[0] = $column->get_column_id($cid);
                break;
            case 'head':
                $result = $column->get_column_head();
                break;
            case 'foot':
                $result = $column->get_column_foot();
                break;
            default:
                $result[0] = $column->get_column_id($cid);
                break;
        }
    $sub = count($result);
    foreach($result as $index=>$m):
        $hides = 1;
        $hide = explode("|",$hides);
        $m['_index']= $index;
        if($data['classnow']==$m['id'] || $data['class1']==$m['id'] || $data['class2']==$m['id']){
            $m['class']="";
        }else{
            $m['class'] = '';
        }
        if(in_array($m['name'],$hide)){
            unset($m['id']);
            unset($m['class']);
            $m['hide'] = $hide;
            $m['sub'] = 0;
        }
    

        if(substr(trim($m['icon']),0,1) == 'm' || substr(trim($m['icon']),0,1) == ''){
            $m['icon'] = 'icon fa-pencil-square-o '.$m['icon'];
        }
        $m['urlnew'] = $m['new_windows'] ? "target='_blank'" :"target='_self'";
        $m['_first']=$index==0 ? true:false;
        $m['_last']=$index==(count($result)-1)?true:false;
        $$m = $m;
?>
		<li class="widget">
			<div class="cover overlay overlay-hover">
				<img class="cover-image overlay-scale" src="<?php echo thumb($v['imgurl'],$c['met_imgs_x'],$c['met_imgs_y']);?>" alt="<?php echo $v['title'];?>" height='100'/>
			</div>
		    <div class="cover-title">
			  <h3><?php echo $m['name'];?></h3>
			</div>
		</li>
	<?php endforeach;?>
<?php }else{ ?>
<?php
    $cid = 0;
    if($cid == 0){
        $cid = $data['classnow'];
    }
    $num = $c['met_img_list'];
    $order = "no_order";
    $result = load::sys_class('label', 'new')->get('img')->get_list_page($cid,$data['page']);
    $sub = count($result);
     foreach($result as $index=>$v):
        $v['sub']      = $sub;
        $v['_index']   = $index;
        $v['_first']   = $index == 0 ? true:false;
        $v['_last']    = $index == (count($result)-1) ? true : false;
?>
	<li class="widget <?php echo $v['page'];?>">
		<div class="cover overlay overlay-hover">
			<a href='<?php echo $v['url'];?>' title='<?php echo $v['title'];?>' <?php echo $v['urlnew'];?> class="btn btn-outline btn-inverse met-img-showbtn" target="<?php echo $lang['met_listurlblank'];?>">
					<img class="cover-image overlay-scale" src="<?php echo thumb($v['imgurl'],$c['met_imgs_x'],$c['met_imgs_y']);?>" alt="<?php echo $v['title'];?>"/>
			</a>
		</div>
	    <div class="cover-title">
		  <h3><a href='<?php echo $v['url'];?>' <?php echo $v['urlnew'];?> title='<?php echo $v['title'];?>'><?php echo $v['title'];?></a></h3>
		</div>
	</li>
<?php endforeach;?>
<?php } ?>