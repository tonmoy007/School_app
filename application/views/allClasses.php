<div flex-xs="" flex-gt-xs="50" layout="column">
       <md-card md-theme="{{ showDarkTheme ? 'dark-grey' : 'default' }}" md-theme-watch="">
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">All Classes</span>
            <span class="md-subhead">{{date|date:mediumDate}}</span>
          </md-card-title-text>

          <md-card-title-media>
            <div class="md-toolbar-tools ">

            <md-button class="md-fab md-mini md-primary pull-right" ng-disabled="!classes.length" ng-click="takeAttendence($event)" aria-label="Take attendance" >
                     <md-icon md-svg-src="assets/img/accessories/attendence.svg"></md-icon>
                     <md-tooltip md-direction="top" md-delay="800">
                      Take Attendence
                    </md-tooltip>
                </md-button>
                <md-button class="md-fab md-mini md-primary pull-right" ng-click="showAdvanced($event)" aria-label="add new class">
                     <md-icon md-svg-src="assets/img/add-button.svg"></md-icon>
                     <md-tooltip md-direction="top" md-delay="800">
                      Add New Class
                    </md-tooltip>
                </md-button>
            </div>

          </md-card-title-media>
        </md-card-title>
        <md-divider></md-divider>
  
        <classes id="user.id" ></classes>
      </md-card>
  </div>