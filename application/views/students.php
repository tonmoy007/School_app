<md-list ng-if="studentLoaded">

  <md-list-item class="md-3-line mr-tb" ng-repeat="(key,item) in ir_students">
    <img ng-src="assets/img/accessories/sleeping.svg" class="md-avatar md-not-circle" alt="{{item.class}}">
    <div class="md-list-item-text">

      <h3 ><strong>{{item.student_name}}</strong></h3>
      <em flex>Absent form <strong>{{item.d_from|date:small}}</strong> to <strong>{{item.d_to|date:small}}</strong></em>
      <h4>Reason</h4>
      <p>{{item.reason}}</p>
      
    </div>
    <!-- <md-button class="md-secondary md-icon-button" ng-click="editStudent(key)" aria-label="call">
            <md-icon md-svg-icon="assets/img/accessories/edit.svg"></md-icon>
            <md-tooltip md-delay="700" md-direction="right">edit</md-tooltip>
    </md-button> -->
    <md-divider ng-if="!$last"></md-divider>
  </md-list-item>
  <md-progress-circular ng-if="addingStudent" ng-disabled="!addingStudent" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>
  <div class="alert " ng-if="!ir_students.length">
    No Student added
  </div>
</md-list>