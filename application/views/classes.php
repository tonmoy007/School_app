<md-list ng-if="classLoaded">

  <md-list-item class="md-3-line" ng-repeat="(key,item) in classes">
    <img ng-src="assets/img/accessories/class.svg" class="md-avatar md-not-circle" alt="{{item.class}}">
    <div class="md-list-item-text">

      <h3><strong>{{item.class_name}}</strong></h3>
      <em>Section {{item.section}}</em>
      <h4>Total Students <strong>{{item.total_student}}</strong></h4>
      
    </div>
    <md-button class="md-secondary md-icon-button" ng-click="editCLass(key)" aria-label="call">
            <md-icon md-svg-icon="assets/img/accessories/edit.svg"></md-icon>
            <md-tooltip md-delay="700" md-direction="right">edit</md-tooltip>
    </md-button>
    <md-divider ng-if="!$last"></md-divider>
  </md-list-item>
  <md-progress-circular ng-if="addingClass" ng-disabled="!addingClass" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>
  <div class="alert " ng-if="!classes.length">
    no class added
  </div>
</md-list>