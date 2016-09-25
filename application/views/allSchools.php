<div flex-xs="" flex-gt-xs="50" layout="column">
       <md-card md-theme="{{ showDarkTheme ? 'dark-grey' : 'default' }}" md-theme-watch="">
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">All Schools</span>
            <span class="md-subhead">{{date|date:mediumDate}}</span>
          </md-card-title-text>

          <md-card-title-media>
            <div class="md-toolbar-tools ">
            
                <md-button class="md-fab md-mini md-primary pull-right" ng-click="addClassDialoge($event)" aria-label="add new School">
                     <md-icon md-svg-src="assets/img/add-button.svg"></md-icon>
                     <md-tooltip md-direction="top" md-delay="800">
                      Add New School
                    </md-tooltip>
                </md-button>
            </div>
          </md-card-title-media>
        </md-card-title>
        <md-divider></md-divider>
  
        <!-- <classes id="user.id" ></classes> -->
        <md-list flex ng-if="schoolLoaded" class="school-list">

        <md-list-item class="md-3-line" ng-click="redirectTo('#/school/'+item.id)" ng-repeat="(key,item) in schools">
          <img ng-src="assets/img/accessories/school.svg" class="md-avatar md-not-circle" alt="{{item.class}}">
          <div class="md-list-item-text">

            <h3><strong>{{item.school_name}}</strong></h3>
            
            <div layout="column">
            <em>ব্যবস্থাপনা -{{item.management}}</em>
              <div layout="row">
                <md-icon flex="none" style="margin-bottom:10px;" classe="md-thumb" md-svg-icon="assets/img/accessories/phone-book.svg"></md-icon>
              <h4 flex style="margin-bottom:10px;">&nbsp;{{item.phone}}</h4>
              </div>
            </div>
            
          </div>
          <md-button class="md-secondary md-icon-button" ng-click="editSchool(key)" aria-label="call">
                  <md-icon md-svg-icon="assets/img/accessories/edit.svg"></md-icon>
                  <md-tooltip md-delay="700" md-direction="right">edit</md-tooltip>
          </md-button>
          <md-divider ng-if="!$last"></md-divider>
        </md-list-item>
        <md-progress-circular ng-if="addingSchool" ng-disabled="!addingSchool" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>
        <div class="alert " ng-if="!schools.length">
          no School added
        </div>
      </md-list>
      </md-card>
  </div>