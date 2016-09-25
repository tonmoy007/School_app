var components=angular.module('components',['ticker','simpleAngularTicker'])
.directive('menu',function($interval){
    return{
        templateUrl:'index.php/home/getTemplate/menu/home',
        link:function(scope,elem,attr){
            scope.drop=[];
            scope.interval=2000;
            scope.cover=[
            {src:'assets/img/background/1.jpg',active:true},
            {src:'assets/img/background/2.jpg',active:false},
            {src:'assets/img/background/3.jpg',active:false},
            {src:'assets/img/background/4.jpg',active:false},
            {src:'assets/img/background/5.jpg',active:false},
            {src:'assets/img/background/6.jpg',active:false},
            {src:'assets/img/background/7.jpg',active:false},
            ]
            for(i=0;i<6;i++){
                scope.drop[i]=false;
            }
            scope.index=0;
            total=scope.cover.length;
            $interval(function(){
                index=scope.index;
                if(index==total-1){
                    scope.index=0;
                }else{
                    scope.index++;
                }

                scope.cover[index].active=true;
                if(index==0){
                    scope.cover[total-1].active=false;
                }else{
                    scope.cover[index-1].active=false;
                }
            },scope.interval);
            scope.setVisible=function(index){
                scope.drop[index]=!scope.drop[index];
                angular.forEach(scope.drop,function(value,key){

                    if(key!=index){
                        scope.drop[key]=false;
                    }
                })
            }
        }
    }
}).directive('sidebar',function(){
    return{
        replace:true,
        templateUrl:'index.php/home/getTemplate/side-bar/home',
        link:function(scope){

        }
    }
}).directive('boxTicker',function(){
    return{
        templateUrl:'index.php/home/getTemplate/ticker/home'
    }

}).directive('newsTicker',function(){
    return{
        templateUrl:'index.php/home/getTemplate/news-ticker/home',
        link:function(scope){
            scope.myTickerItems = [
                   {
                     title: 'খবর 1',
                     copy: 'ড. মহীউদ্দীন খান আলমগীর স্যারের কচুয়া সফর সূচী (ডিসেম্বর ০৫, ২০১৫ | শনিবার)',
                     class:'bq-primary'
                   },
                   {
                     title: 'খবর 2',
                     copy: 'ঈদ উৎসব-২০১৫ এর অনুষ্ঠান/প্রতিযোগিতা সূচি (২৬ সেপ্টেম্বর ২০১৫ খ্রিঃ)',
                     class:'bq-warning'
                   },
                   {
                     title: 'খবর 3',
                     copy: 'উপজেলা উন্নয়ন মেলা ২০১৫ এর অনুষ্ঠান সূচি (২৭-২৯ সেপ্টেম্বর,২০১৫ খ্রিঃ)',
                     class:'bq-success'
                   },
                   {
                     title: 'খবর ৪',
                     copy: 'ড. মহীউদ্দীন খান আলমগীর স্যারের কচুয়া সফর সূচী (সেপ্টেম্বর০৩,২০১৫|বৃহস্পতিবার)',
                     class:'bq-danger'
                   },
                   {
                     title: 'খবর ৫',
                     copy: 'ড. মহীউদ্দীন খান আলমগীর স্যারের কচুয়া সফর সূচী (আগষ্ট ১৩, ২০১৫ বৃহস্পতিবার, আগষ্ট ১৪,...',
                     class:'bq-primary'
                   },
                   {
                     title: 'খবর ৬',
                     copy: 'জাতীয় তথ্য বাতায়ন',
                     class:'bq-warning'
                   },
                   {
                     title: 'খবর ৭',
                     copy: 'জাতীয় ই-তথ্যকোষ',
                     class:'bq-success'
                   }
                ];
        }
    }


}).directive('backToTop',function($window,scrollMe){
    return{
        templateUrl:'index.php/home/getTemplate/back-to-top',
        link:function(scope,elem){
            elem.fadeOut();

            scope.goTop=function(){
                scrollMe.goTop();
            }

            angular.element($window).bind('scroll', function(event) {
                /* Act on the event */
                menu=angular.element($('menu')).height();
                offset=this.pageYOffset;
                // console.log(menu)
                maxheight=$(window).height();
                if(offset>menu){
                    elem.fadeIn();
                    scope.$apply();
                }else{
                    elem.fadeOut();
                }
                // console.log(maxheight);
            });
        }
    }
}).directive('footer',function(){
    return{
        templateUrl:'index.php/home/getTemplate/foot/home'
    }
})

components.factory('scrollMe',function(){
    func={};
    func.goTop=function(){
        angular.element('body,html').animate({ scrollTop: 0 }, "slow");
    }
    return func;
})