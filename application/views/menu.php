<ul id="gn-menu" class="gn-menu-main">
                <li class="gn-trigger">
                    <a class="gn-icon gn-icon-menu"><span>Menu</span></a>
                    <nav class="gn-menu-wrapper gn-open-part">
                        <div class="gn-scroller">
                            <ul class="gn-menu">
                                <li class="gn-search-item">
                                    <input placeholder="Search" type="search" class="gn-search">
                                    <a class="gn-icon gn-icon-search"><span>Search</span></a>

                                </li>
                                
                                <li ng-if="user.user_type=='user'" report-menu></li>
                                <li ng-if="user.user_type=='user'"><a href="#/submitted_reports" class="gn-icon gn-icon-article" >Submitted Reports</a></li>
                                <li ng-if="user.user_type=='admin'">
                                    <info-menu></info-menu>
                                </li>
                                <li>
                                    <a class="gn-icon gn-icon-archive " href="#/attendance">উপস্থিতি</a>
                                    
                                </li>
                                <li>
                                    <a class="gn-icon gn-icon-archive" href="#/notice-board">প্রজ্ঞাপন (নোটিশ)</a>
                                    
                                </li>
                            </ul>
                        </div><!-- /gn-scroller -->
                    </nav>
                </li>
                <li><a href="#/" class="head-bar">{{app_name}}</a></li>
                
                <li> 
                
                 <span flex></span>
                <md-toolbar-tools layout="right center">
                    <md-menu md-position-mode="target-right target">
                      <md-button aria-label="menu" class="" ng-click="$mdOpenMenu()">
                        <md-icon md-svg-src="assets/img/accessories/user.svg"></md-icon>
                        &nbsp;{{user.school_name}}
                      </md-button>
                    
                    <md-menu-content>
                      <md-menu-item>
                        <md-button ng-click="redirectTo('index.php/auth/logout')">
                        <md-list-item aria-label="Logout" class="">
                            <md-icon md-svg-src="assets/img/accessories/logout.svg" aria-label="Twitter"></md-icon>Logout
                        </md-list-item>
                        </md-button>
                    </md-menu-item>
                      
                    </md-menu-content>
                  </md-menu>
                </md-toolbar-tools>
                    
                </li>
                
               
            </ul>