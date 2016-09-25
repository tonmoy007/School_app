<div flex-xs="" flex-gt-xs="50" layout="column">
       <md-card md-theme="{{ showDarkTheme ? 'dark-grey' : 'default' }}" md-theme-watch="">
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">Irregular Students</span>
            <span class="md-subhead">{{date|date:mediumDate}}</span>
          </md-card-title-text>

          <md-card-title-media>
            <div class="md-toolbar-tools ">
            
                <md-button class="md-fab md-mini md-primary pull-right" ng-click="showAdvancedIrregular($event)" aria-label="add new class">
                     <md-icon md-svg-src="assets/img/add-button.svg"></md-icon>
                     <md-tooltip md-direction="top" md-delay="800">
                      Add New Student
                    </md-tooltip>
                </md-button>
            </div>
          </md-card-title-media>
        </md-card-title>
        <md-divider></md-divider>
  
        <students id="user.id" ></students>
      </md-card>
  </div>