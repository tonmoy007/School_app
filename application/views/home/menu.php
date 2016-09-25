<header>
    <div class="cover cool-shadow">
        <div class="search-form" >
            <form  class="md-no-momentum" method="get" accept-charset="utf-8">
             <md-input-container md-no-float class="md-block cool-shadow cool-border">
              
              <input ng-model="search_query" type="text" placeholder="Search">
              <md-icon md-svg-src="assets/img/accessories/search-black.svg"></md-icon>
            </md-input-container>
            </form>
            <a href="index.php/auth/login" class="login" layout="row"><i  class="fa fa-sign-in"></i> <span>login</span></a>
        </div>
        <div class="navbar-brand">
            <img src="assets/img/logo.png" alt="">
            <a href="" class="site-title">একাডেমিক সুপারভিশন</a>
        </div>

        <div class="cover-container">
            <img ng-src="{{img.src}}" ng-repeat="(key, img) in cover" ng-if="img.active" class="animate-if" alt="">
        </div>
        <nav class="detail-nav no-shadow ">
            <div id="nav-icon" ng-class="{open:showMenu}" ng-click="showMenu=!showMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
        <div ng-cloak class="main-nav trans3" ng-class="{open:showMenu}">
    
            <ul class="nav-bar navbar nav " >
                <li><a href="#/">হোম</a></li><!--
             --><li class="dropdown" ng-class="{open:drop[0]}"><a href="" class="dropdown-toggle" ng-click="setVisible(0)">আমাদের সম্পর্কে</a>
                    <ul class="dropdown-menu">
                        <li><a href="">সাঙ্গঠনিক কাঠামো</a></li>
                        <li><a href="">কর্মকর্তাবৃন্দ</a></li>
                        <li><a href="">কর্মচারীবৃন্দ</a></li>
                        <li><a href="">সাবেক কর্মকর্তাবৃন্দ</a></li>
                        <li><a href="">লক্ষ্য ও উদ্দেশ্য</a></li>
                    </ul>
             </li><!--
             --><li class="dropdown" ng-class="{open:drop[1]}"><a href="" class="dropdown-toggle" ng-click="setVisible(1)" >শিক্ষা অফিসের কার্যক্রম</a>
                <ul class="dropdown-menu">
                    <li class="sub-heading ">আমাদের সেবা সমুহ</li>
                    <li><a href="">মাধ্যমিক পরযায়ে শিক্ষক নিয়োগ</a></li>
                    <li><a href="">শিক্ষা প্রতিষ্ঠান পরিদর্শন</a></li>
                    <li><a href="">উপবৃত্তি বিতরন</a></li>
                    <li><a href="">বিনামূল্যে পাঠ্যপুস্তক বিতরন</a></li>
                </ul>
             </li><!--
             --><li class="dropdown" ng-class="{open:drop[2]}"><a href="" class="dropdown-toggle" ng-click="setVisible(2)">ডিজিটাল সেবা সমুহ</a>
                <ul class="dropdown-menu">
                    <li><a href="">Mobile application based attendance management</a></li>
                    <li><a href="">Digital academic supervision</a></li>
                </ul>
             </li><!--
             --><li class="dropdown" ng-class="{open:drop[3]}"><a href="" class="dropdown-toggle" ng-click="setVisible(3)">মাধ্যমিক প্রতিষ্ঠান সমূহের তালিকা</a>
                <ul class="dropdown-menu">
                    <li><a href="">স্কুল</a></li>
                    <li><a href="">কলেজ</a></li>
                    <li><a href="">মাদ্রাসা</a></li>
                </ul>
             </li><!--
             --><li class="dropdown" ng-class="{open:drop[4]}"><a href="" class="dropdown-toggle" ng-click="setVisible(4)">গ্যালারী</a>
                <ul class="dropdown-menu" >
                    <li><a href="">ভিডিও গ্যালারী</a></li>
                    <li><a href="">ফটো গ্যলারী</a></li>
                </ul>
             </li><!--
             --><li><a href="#/contact">যোগাযোগ</a></li>
            </ul>
        </div>
        </nav>
    </div>
    
</header>