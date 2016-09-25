<md-dialog aria-label="Take Daily Attendence">
  <form ng-cloak name="attendenceForm" novalidate="">
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2><span ng-if="!atClasses[0].present">Take</span> <span ng-if="atClasses[0].present">Edit</span> Todays Attendence</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="cancel()">
          <md-icon md-svg-src="assets/img/cd-icon-close.svg" aria-label="Close dialog"></md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-content flex-xs="">
      <div class="md-dialog-content">
      <md-list-item class="table-head">
        
            <span flex="30"><span>Name</span></span>
            <span flex="20"><span>Total</span></span>
            <span flex="25">Attend</span>
            <span flex="25" class="text-center">Absent</span>
        
        <md-divider></md-divider>
      </md-list-item>
        <md-list-item ng-repeat="(key,class) in atClasses" class="table-list">
          
          <h4 flex="30"><span>{{class.class_name}}</span></h4>
          <h5 flex="20"><span><strong>{{class.total_student}}</strong></span></h5>
          <md-input-container md-no-float class="md-block" flex="25">
          
            <input required name="attend{{key}}"  ng-model="class.present" aria-label="attendence{{class.class_name}}"/>
            
            <div ng-messages="attendenceForm['attend'+key].$error" ng-if="!showHints">
              <div ng-message="required">Attendence is required.</div>
            </div>
          </md-input-container>
        <div flex="25" class="text-center"><span>{{class.total_student-class.present}}</span></div>
         <md-divider ng-if="!$last"></md-divider>
        </md-list-item>
        
      </div>
    </md-dialog-content>

    <md-dialog-actions layout="row">
      
      <span flex></span>
      <md-button ng-click="answer('cancel',attendenceForm)">
       Cancel
      </md-button>
      <md-button ng-click="answer(atClasses,attendenceForm)">
        Submit
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>